import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始导入电商模块菜单...')

  // 检查菜单是否已存在
  const existingMenu = await prisma.menu.findFirst({
    where: { menuId: 200 },
  })

  if (existingMenu) {
    console.log('⏭️  电商菜单已存在，跳过导入')
    return
  }

  // 菜单数据
  const menus = [
    // App用户管理目录
    {
      menuId: 200,
      menuName: 'App用户',
      parentId: 0,
      orderNum: 2,
      path: '/app-user',
      component: null,
      menuType: 'M',
      visible: 1,
      status: 1,
      perms: null,
      icon: 'User',
      remark: 'App用户管理目录',
    },
    // 用户管理
    {
      menuId: 201,
      menuName: '用户管理',
      parentId: 200,
      orderNum: 1,
      path: 'index',
      component: '/app-user/index',
      menuType: 'C',
      visible: 1,
      status: 1,
      perms: 'app:user:list',
      icon: 'User',
      remark: 'App用户管理菜单',
    },
    // 用户标签
    {
      menuId: 202,
      menuName: '用户标签',
      parentId: 200,
      orderNum: 2,
      path: 'tag',
      component: '/app-user/user-tag',
      menuType: 'C',
      visible: 1,
      status: 1,
      perms: 'app:user:tag:list',
      icon: 'PriceTag',
      remark: '用户标签管理',
    },
    // 用户等级
    {
      menuId: 203,
      menuName: '用户等级',
      parentId: 200,
      orderNum: 3,
      path: 'level',
      component: '/app-user/user-level',
      menuType: 'C',
      visible: 1,
      status: 1,
      perms: 'app:user:level:list',
      icon: 'Star',
      remark: '用户等级管理',
    },
    // 用户分组
    {
      menuId: 204,
      menuName: '用户分组',
      parentId: 200,
      orderNum: 4,
      path: 'group',
      component: '/app-user/user-group',
      menuType: 'C',
      visible: 1,
      status: 1,
      perms: 'app:user:group:list',
      icon: 'Grid',
      remark: '用户分组管理',
    },
    // 商品管理目录
    {
      menuId: 300,
      menuName: '商品管理',
      parentId: 0,
      orderNum: 3,
      path: '/product',
      component: null,
      menuType: 'M',
      visible: 1,
      status: 1,
      perms: null,
      icon: 'Goods',
      remark: '商品管理目录',
    },
    // 商品列表
    {
      menuId: 301,
      menuName: '商品列表',
      parentId: 300,
      orderNum: 1,
      path: 'index',
      component: '/product/index',
      menuType: 'C',
      visible: 1,
      status: 1,
      perms: 'product:list',
      icon: 'ShoppingBag',
      remark: '商品列表管理',
    },
    // 订单管理
    {
      menuId: 400,
      menuName: '订单管理',
      parentId: 0,
      orderNum: 4,
      path: '/order',
      component: '/order/index',
      menuType: 'C',
      visible: 1,
      status: 1,
      perms: 'order:list',
      icon: 'ShoppingCart',
      remark: '订单管理',
    },
  ]

  // 导入菜单
  for (const menu of menus) {
    await prisma.menu.create({ data: menu })
    console.log(`✅ 已创建菜单: ${menu.menuName}`)
  }

  // 为管理员角色分配菜单权限
  console.log('\n开始分配菜单权限给管理员角色...')
  
  const adminRole = await prisma.role.findFirst({
    where: { roleId: 1 },
  })

  if (!adminRole) {
    console.log('⚠️  未找到管理员角色(roleId=1)')
    return
  }

  // 获取新创建的菜单ID
  const newMenuIds = menus.map((m) => m.menuId)

  for (const menuId of newMenuIds) {
    const exists = await prisma.roleMenu.findFirst({
      where: {
        roleId: 1,
        menuId: menuId,
      },
    })

    if (!exists) {
      await prisma.roleMenu.create({
        data: {
          roleId: 1,
          menuId: menuId,
        },
      })
      console.log(`✅ 已为管理员角色分配菜单权限: menuId=${menuId}`)
    }
  }

  console.log('\n✅ 电商模块菜单导入完成！')
}

main()
  .catch((e) => {
    console.error('❌ 导入失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

