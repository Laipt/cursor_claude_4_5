import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 清空数据（开发环境）
  await prisma.userRole.deleteMany();
  await prisma.roleMenu.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.dict.deleteMany();
  await prisma.dictData.deleteMany();
  await prisma.config.deleteMany();

  // 创建菜单
  const menus = [
    // 首页
    {
      menuId: 100,
      menuName: '首页',
      parentId: 0,
      orderNum: 0,
      path: '/home',
      component: '/home/index',
      menuType: 'C',
      visible: 1,
      status: 1,
      perms: null,
      icon: 'HomeFilled',
      remark: '首页',
    },
    // 系统管理目录
    {
      menuId: 1,
      menuName: '系统管理',
      parentId: 0,
      orderNum: 1,
      path: '/system',
      component: null,
      menuType: 'M',
      visible: 1,
      status: 1,
      perms: null,
      icon: 'Setting',
      remark: '系统管理目录',
    },
    // 用户管理
    {
      menuId: 2,
      menuName: '用户管理',
      parentId: 1,
      orderNum: 1,
      path: 'user',
      component: '/system/user/index',
      menuType: 'C',
      visible: 1,
      status: 1,
      perms: 'system:user:list',
      icon: 'User',
      remark: '用户管理菜单',
    },
    {
      menuId: 3,
      menuName: '用户查询',
      parentId: 2,
      orderNum: 1,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:user:query',
      icon: null,
      remark: null,
    },
    {
      menuId: 4,
      menuName: '用户新增',
      parentId: 2,
      orderNum: 2,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:user:add',
      icon: null,
      remark: null,
    },
    {
      menuId: 5,
      menuName: '用户修改',
      parentId: 2,
      orderNum: 3,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:user:edit',
      icon: null,
      remark: null,
    },
    {
      menuId: 6,
      menuName: '用户删除',
      parentId: 2,
      orderNum: 4,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:user:remove',
      icon: null,
      remark: null,
    },
    {
      menuId: 7,
      menuName: '重置密码',
      parentId: 2,
      orderNum: 5,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:user:resetPwd',
      icon: null,
      remark: null,
    },
    // 角色管理
    {
      menuId: 8,
      menuName: '角色管理',
      parentId: 1,
      orderNum: 2,
      path: 'role',
      component: '/system/role/index',
      menuType: 'C',
      visible: 1,
      status: 1,
      perms: 'system:role:list',
      icon: 'UserFilled',
      remark: '角色管理菜单',
    },
    {
      menuId: 9,
      menuName: '角色查询',
      parentId: 8,
      orderNum: 1,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:role:query',
      icon: null,
      remark: null,
    },
    {
      menuId: 10,
      menuName: '角色新增',
      parentId: 8,
      orderNum: 2,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:role:add',
      icon: null,
      remark: null,
    },
    {
      menuId: 11,
      menuName: '角色修改',
      parentId: 8,
      orderNum: 3,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:role:edit',
      icon: null,
      remark: null,
    },
    {
      menuId: 12,
      menuName: '角色删除',
      parentId: 8,
      orderNum: 4,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:role:remove',
      icon: null,
      remark: null,
    },
    // 菜单管理
    {
      menuId: 13,
      menuName: '菜单管理',
      parentId: 1,
      orderNum: 3,
      path: 'menu',
      component: '/system/menu/index',
      menuType: 'C',
      visible: 1,
      status: 1,
      perms: 'system:menu:list',
      icon: 'Menu',
      remark: '菜单管理菜单',
    },
    {
      menuId: 14,
      menuName: '菜单查询',
      parentId: 13,
      orderNum: 1,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:menu:query',
      icon: null,
      remark: null,
    },
    {
      menuId: 15,
      menuName: '菜单新增',
      parentId: 13,
      orderNum: 2,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:menu:add',
      icon: null,
      remark: null,
    },
    {
      menuId: 16,
      menuName: '菜单修改',
      parentId: 13,
      orderNum: 3,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:menu:edit',
      icon: null,
      remark: null,
    },
    {
      menuId: 17,
      menuName: '菜单删除',
      parentId: 13,
      orderNum: 4,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:menu:remove',
      icon: null,
      remark: null,
    },
    // 字典管理
    {
      menuId: 18,
      menuName: '字典管理',
      parentId: 1,
      orderNum: 4,
      path: 'dict',
      component: '/system/dict/index',
      menuType: 'C',
      visible: 1,
      status: 1,
      perms: 'system:dict:list',
      icon: 'Collection',
      remark: '字典管理菜单',
    },
    {
      menuId: 19,
      menuName: '字典查询',
      parentId: 18,
      orderNum: 1,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:dict:query',
      icon: null,
      remark: null,
    },
    {
      menuId: 20,
      menuName: '字典新增',
      parentId: 18,
      orderNum: 2,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:dict:add',
      icon: null,
      remark: null,
    },
    {
      menuId: 21,
      menuName: '字典修改',
      parentId: 18,
      orderNum: 3,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:dict:edit',
      icon: null,
      remark: null,
    },
    {
      menuId: 22,
      menuName: '字典删除',
      parentId: 18,
      orderNum: 4,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:dict:remove',
      icon: null,
      remark: null,
    },
    // 参数设置
    {
      menuId: 23,
      menuName: '参数设置',
      parentId: 1,
      orderNum: 5,
      path: 'config',
      component: '/system/config/index',
      menuType: 'C',
      visible: 1,
      status: 1,
      perms: 'system:config:list',
      icon: 'Tools',
      remark: '参数设置菜单',
    },
    {
      menuId: 24,
      menuName: '参数查询',
      parentId: 23,
      orderNum: 1,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:config:query',
      icon: null,
      remark: null,
    },
    {
      menuId: 25,
      menuName: '参数新增',
      parentId: 23,
      orderNum: 2,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:config:add',
      icon: null,
      remark: null,
    },
    {
      menuId: 26,
      menuName: '参数修改',
      parentId: 23,
      orderNum: 3,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:config:edit',
      icon: null,
      remark: null,
    },
    {
      menuId: 27,
      menuName: '参数删除',
      parentId: 23,
      orderNum: 4,
      path: null,
      component: null,
      menuType: 'F',
      visible: 1,
      status: 1,
      perms: 'system:config:remove',
      icon: null,
      remark: null,
    },
  ];

  for (const menu of menus) {
    await prisma.menu.create({ data: menu });
  }
  console.log('Menus created');

  // 创建管理员角色
  const adminRole = await prisma.role.create({
    data: {
      roleName: '管理员',
      roleKey: 'admin',
      roleSort: 1,
      status: 1,
      remark: '超级管理员',
    },
  });
  console.log('Admin role created');

  // 为管理员角色分配所有菜单权限
  const allMenus = await prisma.menu.findMany();
  for (const menu of allMenus) {
    await prisma.roleMenu.create({
      data: {
        roleId: adminRole.roleId,
        menuId: menu.menuId,
      },
    });
  }
  console.log('Admin role assigned all menus');

  // 创建管理员用户
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      nickname: '管理员',
      email: 'admin@example.com',
      phone: '13800138000',
      status: 1,
    },
  });
  console.log('Admin user created');

  // 为管理员用户分配管理员角色
  await prisma.userRole.create({
    data: {
      userId: adminUser.userId,
      roleId: adminRole.roleId,
    },
  });
  console.log('Admin user assigned admin role');

  // 创建示例字典类型
  const userStatusDict = await prisma.dict.create({
    data: {
      dictName: '用户状态',
      dictType: 'sys_user_status',
      status: 1,
      remark: '用户状态列表',
    },
  });

  // 创建字典数据
  await prisma.dictData.createMany({
    data: [
      {
        dictSort: 1,
        dictLabel: '正常',
        dictValue: '1',
        dictType: 'sys_user_status',
        cssClass: '',
        listClass: 'success',
        isDefault: 1,
        status: 1,
        remark: '正常状态',
      },
      {
        dictSort: 2,
        dictLabel: '禁用',
        dictValue: '0',
        dictType: 'sys_user_status',
        cssClass: '',
        listClass: 'danger',
        isDefault: 0,
        status: 1,
        remark: '禁用状态',
      },
    ],
  });
  console.log('Dict data created');

  // 创建示例配置
  await prisma.config.createMany({
    data: [
      {
        configName: '系统名称',
        configKey: 'sys.name',
        configValue: 'Admin System',
        configType: 'system',
        remark: '系统名称',
      },
      {
        configName: '系统版本',
        configKey: 'sys.version',
        configValue: '1.0.0',
        configType: 'system',
        remark: '系统版本号',
      },
    ],
  });
  console.log('Config data created');

  console.log('Seed completed successfully!');
  console.log('Admin user: username=admin, password=admin123');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

