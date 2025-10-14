import { PrismaClient } from '@prisma/client';
import { Status, Visible, MenuTypeValue } from '@kk/shared';

const prisma = new PrismaClient();

async function main() {
  console.log('开始添加电商模块菜单...');

  const menus = [
    // ==================== 电商模块 ====================
    // App用户管理目录
    {
      menuId: 200,
      menuName: 'App用户',
      parentId: 0,
      orderNum: 2,
      path: '/app-user',
      component: null,
      menuType: MenuTypeValue.DIRECTORY,
      visible: Visible.VISIBLE,
      status: Status.NORMAL,
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
      menuType: MenuTypeValue.MENU,
      visible: Visible.VISIBLE,
      status: Status.NORMAL,
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
      menuType: MenuTypeValue.MENU,
      visible: Visible.VISIBLE,
      status: Status.NORMAL,
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
      menuType: MenuTypeValue.MENU,
      visible: Visible.VISIBLE,
      status: Status.NORMAL,
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
      menuType: MenuTypeValue.MENU,
      visible: Visible.VISIBLE,
      status: Status.NORMAL,
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
      menuType: MenuTypeValue.DIRECTORY,
      visible: Visible.VISIBLE,
      status: Status.NORMAL,
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
      menuType: MenuTypeValue.MENU,
      visible: Visible.VISIBLE,
      status: Status.NORMAL,
      perms: 'product:list',
      icon: 'ShoppingBag',
      remark: '商品列表管理',
    },
    // 商品规格
    {
      menuId: 302,
      menuName: '商品规格',
      parentId: 300,
      orderNum: 2,
      path: 'spec',
      component: '/product/product-spec',
      menuType: MenuTypeValue.MENU,
      visible: Visible.VISIBLE,
      status: Status.NORMAL,
      perms: 'product:spec:list',
      icon: 'SetUp',
      remark: '商品规格管理',
    },
    // 商品评论
    {
      menuId: 303,
      menuName: '商品评论',
      parentId: 300,
      orderNum: 3,
      path: 'reply',
      component: '/product/product-reply',
      menuType: MenuTypeValue.MENU,
      visible: Visible.VISIBLE,
      status: Status.NORMAL,
      perms: 'product:reply:list',
      icon: 'ChatDotRound',
      remark: '商品评论管理',
    },

    // 订单管理
    {
      menuId: 400,
      menuName: '订单管理',
      parentId: 0,
      orderNum: 4,
      path: '/order',
      component: '/order/index',
      menuType: MenuTypeValue.MENU,
      visible: Visible.VISIBLE,
      status: Status.NORMAL,
      perms: 'order:list',
      icon: 'ShoppingCart',
      remark: '订单管理',
    },
  ];

  // 逐个创建菜单
  for (const menu of menus) {
    try {
      // 检查菜单是否已存在
      const existing = await prisma.menu.findUnique({
        where: { menuId: menu.menuId },
      });

      if (existing) {
        console.log(`菜单 ${menu.menuName} (ID: ${menu.menuId}) 已存在，跳过`);
        continue;
      }

      await prisma.menu.create({ data: menu });
      console.log(`✅ 创建菜单: ${menu.menuName} (ID: ${menu.menuId})`);
    } catch (error) {
      console.error(`❌ 创建菜单失败: ${menu.menuName}`, error);
    }
  }

  // 为管理员角色分配新菜单权限
  console.log('\n为管理员角色分配菜单权限...');
  const adminRole = await prisma.role.findFirst({
    where: { roleKey: 'admin' },
  });

  if (adminRole) {
    for (const menu of menus) {
      try {
        // 检查权限是否已存在
        const existing = await prisma.roleMenu.findFirst({
          where: {
            roleId: adminRole.roleId,
            menuId: menu.menuId,
          },
        });

        if (existing) {
          continue;
        }

        await prisma.roleMenu.create({
          data: {
            roleId: adminRole.roleId,
            menuId: menu.menuId,
          },
        });
        console.log(`✅ 分配权限: ${menu.menuName} → 管理员`);
      } catch (error) {
        console.error(`❌ 分配权限失败: ${menu.menuName}`, error);
      }
    }
  } else {
    console.log('⚠️  未找到管理员角色');
  }

  console.log('\n✅ 电商模块菜单添加完成!');
}

main()
  .catch((e) => {
    console.error('❌ 添加菜单失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


