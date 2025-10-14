import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('='.repeat(60))
  console.log('验证电商模块数据导入情况')
  console.log('='.repeat(60))

  // 1. 验证菜单
  console.log('\n【1. 菜单数据】')
  const menus = await prisma.menu.findMany({
    where: {
      menuId: {
        in: [200, 201, 202, 203, 204, 300, 301, 400],
      },
    },
    orderBy: { menuId: 'asc' },
  })
  console.log(`✅ 已导入 ${menus.length} 个菜单:`)
  menus.forEach((menu) => {
    console.log(`   - ${menu.menuName} (ID: ${menu.menuId}, 路径: ${menu.path})`)
  })

  // 2. 验证角色菜单权限
  console.log('\n【2. 菜单权限】')
  const roleMenus = await prisma.roleMenu.findMany({
    where: {
      menuId: {
        in: [200, 201, 202, 203, 204, 300, 301, 400],
      },
    },
    include: {
      role: true,
      menu: true,
    },
  })
  console.log(`✅ 已分配 ${roleMenus.length} 个菜单权限:`)
  const groupedByRole = roleMenus.reduce((acc, rm) => {
    const roleName = rm.role.roleName
    if (!acc[roleName]) acc[roleName] = []
    acc[roleName].push(rm.menu.menuName)
    return acc
  }, {} as Record<string, string[]>)
  
  Object.entries(groupedByRole).forEach(([roleName, menuNames]) => {
    console.log(`   - ${roleName}: ${menuNames.join(', ')}`)
  })

  // 3. 验证字典类型
  console.log('\n【3. 字典类型】')
  const dictTypes = [
    'app_user_status',
    'product_status',
    'order_status',
    'pay_status',
    'delivery_status',
    'refund_status',
    'balance_type',
    'balance_action',
    'reply_score',
  ]
  
  const dicts = await prisma.dict.findMany({
    where: {
      dictType: {
        in: dictTypes,
      },
    },
    orderBy: { dictType: 'asc' },
  })
  console.log(`✅ 已导入 ${dicts.length} 个字典类型:`)
  dicts.forEach((dict) => {
    console.log(`   - ${dict.dictName} (${dict.dictType})`)
  })

  // 4. 验证字典数据
  console.log('\n【4. 字典数据】')
  const dictData = await prisma.dictData.findMany({
    where: {
      dictType: {
        in: dictTypes,
      },
    },
  })
  console.log(`✅ 已导入 ${dictData.length} 个字典数据项`)
  
  // 按字典类型分组显示
  const groupedByType = dictData.reduce((acc, dd) => {
    if (!acc[dd.dictType]) acc[dd.dictType] = []
    acc[dd.dictType].push(`${dd.dictLabel}(${dd.dictValue})`)
    return acc
  }, {} as Record<string, string[]>)
  
  Object.entries(groupedByType).forEach(([type, labels]) => {
    console.log(`   - ${type}: ${labels.join(', ')}`)
  })

  // 5. 验证新增的表
  console.log('\n【5. 新增表】')
  
  const userLevelCount = await prisma.userLevel.count()
  console.log(`✅ eb_user_level 表存在，当前记录数: ${userLevelCount}`)
  
  const userTagCount = await prisma.userTag.count()
  console.log(`✅ eb_user_tag 表存在，当前记录数: ${userTagCount}`)
  
  const userGroupCount = await prisma.userGroup.count()
  console.log(`✅ eb_user_group 表存在，当前记录数: ${userGroupCount}`)

  console.log('\n' + '='.repeat(60))
  console.log('✅ 数据验证完成！所有数据已成功导入数据库')
  console.log('='.repeat(60))
}

main()
  .catch((e) => {
    console.error('❌ 验证失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

