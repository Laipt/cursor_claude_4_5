-- 添加电商模块菜单

-- App用户管理目录
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, menu_type, visible, status, perms, icon, remark, create_time, update_time)
VALUES (200, 'App用户', 0, 2, '/app-user', NULL, 'M', 1, 1, NULL, 'User', 'App用户管理目录', NOW(), NOW());

-- 用户管理
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, menu_type, visible, status, perms, icon, remark, create_time, update_time)
VALUES (201, '用户管理', 200, 1, 'index', '/app-user/index', 'C', 1, 1, 'app:user:list', 'User', 'App用户管理菜单', NOW(), NOW());

-- 用户标签
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, menu_type, visible, status, perms, icon, remark, create_time, update_time)
VALUES (202, '用户标签', 200, 2, 'tag', '/app-user/user-tag', 'C', 1, 1, 'app:user:tag:list', 'PriceTag', '用户标签管理', NOW(), NOW());

-- 用户等级
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, menu_type, visible, status, perms, icon, remark, create_time, update_time)
VALUES (203, '用户等级', 200, 3, 'level', '/app-user/user-level', 'C', 1, 1, 'app:user:level:list', 'Star', '用户等级管理', NOW(), NOW());

-- 用户分组
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, menu_type, visible, status, perms, icon, remark, create_time, update_time)
VALUES (204, '用户分组', 200, 4, 'group', '/app-user/user-group', 'C', 1, 1, 'app:user:group:list', 'Grid', '用户分组管理', NOW(), NOW());

-- 商品管理目录
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, menu_type, visible, status, perms, icon, remark, create_time, update_time)
VALUES (300, '商品管理', 0, 3, '/product', NULL, 'M', 1, 1, NULL, 'Goods', '商品管理目录', NOW(), NOW());

-- 商品列表
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, menu_type, visible, status, perms, icon, remark, create_time, update_time)
VALUES (301, '商品列表', 300, 1, 'index', '/product/index', 'C', 1, 1, 'product:list', 'ShoppingBag', '商品列表管理', NOW(), NOW());

-- 商品规格
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, menu_type, visible, status, perms, icon, remark, create_time, update_time)
VALUES (302, '商品规格', 300, 2, 'spec', '/product/product-spec', 'C', 1, 1, 'product:spec:list', 'SetUp', '商品规格管理', NOW(), NOW());

-- 商品评论
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, menu_type, visible, status, perms, icon, remark, create_time, update_time)
VALUES (303, '商品评论', 300, 3, 'reply', '/product/product-reply', 'C', 1, 1, 'product:reply:list', 'ChatDotRound', '商品评论管理', NOW(), NOW());

-- 订单管理
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, menu_type, visible, status, perms, icon, remark, create_time, update_time)
VALUES (400, '订单管理', 0, 4, '/order', '/order/index', 'C', 1, 1, 'order:list', 'ShoppingCart', '订单管理', NOW(), NOW());

-- 为管理员角色分配菜单权限
INSERT INTO sys_role_menu (role_id, menu_id, create_time, update_time)
SELECT 1, menu_id, NOW(), NOW() 
FROM sys_menu 
WHERE menu_id >= 200 
AND NOT EXISTS (
  SELECT 1 FROM sys_role_menu WHERE role_id = 1 AND sys_role_menu.menu_id = sys_menu.menu_id
);


