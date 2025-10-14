import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('查询管理员角色...\n')
  
  const roles = await prisma.role.findMany({
    orderBy: { roleId: 'asc' },
  })

  if (roles.length === 0) {
    console.log('❌ 未找到任何角色')
    return
  }

  console.log('现有角色列表：')
  roles.forEach((role) => {
    console.log(`  ID: ${role.roleId}, 名称: ${role.roleName}, 标识: ${role.roleKey}`)
  })

  // 查找管理员角色（通常roleKey是admin）
  const adminRole = roles.find((r) => r.roleKey === 'admin' || r.roleName.includes('管理员'))
  
  if (adminRole) {
    console.log(`\n✅ 找到管理员角色: ID=${adminRole.roleId}, 名称=${adminRole.roleName}`)
    
    // 为管理员角色分配电商模块菜单权限
    const ecommerceMenuIds = [200, 201, 202, 203, 204, 300, 301, 400]
    
    console.log('\n开始分配菜单权限...')
    for (const menuId of ecommerceMenuIds) {
      const exists = await prisma.roleMenu.findFirst({
        where: {
          roleId: adminRole.roleId,
          menuId: menuId,
        },
      })

      if (!exists) {
        await prisma.roleMenu.create({
          data: {
            roleId: adminRole.roleId,
            menuId: menuId,
          },
        })
        console.log(`✅ 已分配菜单权限: menuId=${menuId}`)
      } else {
        console.log(`⏭️  菜单权限已存在: menuId=${menuId}`)
      }
    }
    
    console.log('\n✅ 菜单权限分配完成！')
  } else {
    console.log('\n⚠️  未找到管理员角色')
  }
}

main()
  .catch((e) => {
    console.error('❌ 查询失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

