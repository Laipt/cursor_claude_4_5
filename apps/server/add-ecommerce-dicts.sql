-- 添加电商模块字典数据

-- ==================== 字典类型 ====================

-- App用户状态
INSERT INTO sys_dict (dict_name, dict_type, status, remark, create_time, update_time)
VALUES ('App用户状态', 'app_user_status', 1, 'App用户状态列表', NOW(), NOW());

-- 商品状态
INSERT INTO sys_dict (dict_name, dict_type, status, remark, create_time, update_time)
VALUES ('商品状态', 'product_status', 1, '商品上下架状态', NOW(), NOW());

-- 订单状态
INSERT INTO sys_dict (dict_name, dict_type, status, remark, create_time, update_time)
VALUES ('订单状态', 'order_status', 1, '订单流程状态', NOW(), NOW());

-- 支付状态
INSERT INTO sys_dict (dict_name, dict_type, status, remark, create_time, update_time)
VALUES ('支付状态', 'pay_status', 1, '订单支付状态', NOW(), NOW());

-- 发货状态
INSERT INTO sys_dict (dict_name, dict_type, status, remark, create_time, update_time)
VALUES ('发货状态', 'delivery_status', 1, '订单发货状态', NOW(), NOW());

-- 退款状态
INSERT INTO sys_dict (dict_name, dict_type, status, remark, create_time, update_time)
VALUES ('退款状态', 'refund_status', 1, '订单退款状态', NOW(), NOW());

-- 余额调整类型
INSERT INTO sys_dict (dict_name, dict_type, status, remark, create_time, update_time)
VALUES ('余额调整类型', 'balance_type', 1, '余额或积分', NOW(), NOW());

-- 余额调整操作
INSERT INTO sys_dict (dict_name, dict_type, status, remark, create_time, update_time)
VALUES ('余额调整操作', 'balance_action', 1, '增加或减少', NOW(), NOW());

-- 评论评分
INSERT INTO sys_dict (dict_name, dict_type, status, remark, create_time, update_time)
VALUES ('评论评分', 'reply_score', 1, '商品评论评分', NOW(), NOW());

-- ==================== 字典数据 ====================

-- App用户状态
INSERT INTO sys_dict_data (dict_sort, dict_label, dict_value, dict_type, css_class, list_class, is_default, status, remark, create_time, update_time)
VALUES 
(1, '正常', '1', 'app_user_status', '', 'success', 1, 1, '正常状态', NOW(), NOW()),
(2, '禁用', '0', 'app_user_status', '', 'danger', 0, 1, '禁用状态', NOW(), NOW());

-- 商品状态
INSERT INTO sys_dict_data (dict_sort, dict_label, dict_value, dict_type, css_class, list_class, is_default, status, remark, create_time, update_time)
VALUES 
(1, '上架', '1', 'product_status', '', 'success', 1, 1, '商品上架', NOW(), NOW()),
(2, '下架', '0', 'product_status', '', 'info', 0, 1, '商品下架', NOW(), NOW());

-- 订单状态
INSERT INTO sys_dict_data (dict_sort, dict_label, dict_value, dict_type, css_class, list_class, is_default, status, remark, create_time, update_time)
VALUES 
(1, '待发货', '0', 'order_status', '', 'warning', 1, 1, '等待发货', NOW(), NOW()),
(2, '待收货', '1', 'order_status', '', 'primary', 0, 1, '已发货待收货', NOW(), NOW()),
(3, '待评价', '2', 'order_status', '', 'info', 0, 1, '已收货待评价', NOW(), NOW()),
(4, '已完成', '3', 'order_status', '', 'success', 0, 1, '交易完成', NOW(), NOW());

-- 支付状态
INSERT INTO sys_dict_data (dict_sort, dict_label, dict_value, dict_type, css_class, list_class, is_default, status, remark, create_time, update_time)
VALUES 
(1, '未支付', '0', 'pay_status', '', 'warning', 1, 1, '待支付', NOW(), NOW()),
(2, '已支付', '1', 'pay_status', '', 'success', 0, 1, '支付成功', NOW(), NOW());

-- 发货状态
INSERT INTO sys_dict_data (dict_sort, dict_label, dict_value, dict_type, css_class, list_class, is_default, status, remark, create_time, update_time)
VALUES 
(1, '未发货', '0', 'delivery_status', '', 'info', 1, 1, '未发货', NOW(), NOW()),
(2, '已发货', '1', 'delivery_status', '', 'primary', 0, 1, '已发货', NOW(), NOW()),
(3, '已收货', '2', 'delivery_status', '', 'success', 0, 1, '已收货', NOW(), NOW());

-- 退款状态
INSERT INTO sys_dict_data (dict_sort, dict_label, dict_value, dict_type, css_class, list_class, is_default, status, remark, create_time, update_time)
VALUES 
(1, '无退款', '0', 'refund_status', '', 'success', 1, 1, '未申请退款', NOW(), NOW()),
(2, '申请中', '1', 'refund_status', '', 'warning', 0, 1, '退款申请中', NOW(), NOW()),
(3, '已退款', '2', 'refund_status', '', 'info', 0, 1, '退款成功', NOW(), NOW()),
(4, '已拒绝', '3', 'refund_status', '', 'danger', 0, 1, '退款已拒绝', NOW(), NOW());

-- 余额调整类型
INSERT INTO sys_dict_data (dict_sort, dict_label, dict_value, dict_type, css_class, list_class, is_default, status, remark, create_time, update_time)
VALUES 
(1, '余额', 'money', 'balance_type', '', 'primary', 1, 1, '调整余额', NOW(), NOW()),
(2, '积分', 'integral', 'balance_type', '', 'success', 0, 1, '调整积分', NOW(), NOW());

-- 余额调整操作
INSERT INTO sys_dict_data (dict_sort, dict_label, dict_value, dict_type, css_class, list_class, is_default, status, remark, create_time, update_time)
VALUES 
(1, '增加', 'add', 'balance_action', '', 'success', 1, 1, '增加余额或积分', NOW(), NOW()),
(2, '减少', 'subtract', 'balance_action', '', 'warning', 0, 1, '减少余额或积分', NOW(), NOW());

-- 评论评分
INSERT INTO sys_dict_data (dict_sort, dict_label, dict_value, dict_type, css_class, list_class, is_default, status, remark, create_time, update_time)
VALUES 
(1, '5星', '5', 'reply_score', '', 'success', 0, 1, '非常满意', NOW(), NOW()),
(2, '4星', '4', 'reply_score', '', 'primary', 0, 1, '满意', NOW(), NOW()),
(3, '3星', '3', 'reply_score', '', 'warning', 1, 1, '一般', NOW(), NOW()),
(4, '2星', '2', 'reply_score', '', 'danger', 0, 1, '不满意', NOW(), NOW()),
(5, '1星', '1', 'reply_score', '', 'danger', 0, 1, '非常不满意', NOW(), NOW());

