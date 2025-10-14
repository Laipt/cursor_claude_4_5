import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始导入电商字典数据...')

  // 字典类型
  const dictTypes = [
    { dictName: 'App用户状态', dictType: 'app_user_status', status: 1, remark: 'App用户状态列表' },
    { dictName: '商品状态', dictType: 'product_status', status: 1, remark: '商品上下架状态' },
    { dictName: '订单状态', dictType: 'order_status', status: 1, remark: '订单流程状态' },
    { dictName: '支付状态', dictType: 'pay_status', status: 1, remark: '订单支付状态' },
    { dictName: '发货状态', dictType: 'delivery_status', status: 1, remark: '订单发货状态' },
    { dictName: '退款状态', dictType: 'refund_status', status: 1, remark: '订单退款状态' },
    { dictName: '余额调整类型', dictType: 'balance_type', status: 1, remark: '余额或积分' },
    { dictName: '余额调整操作', dictType: 'balance_action', status: 1, remark: '增加或减少' },
    { dictName: '评论评分', dictType: 'reply_score', status: 1, remark: '商品评论评分' },
  ]

  for (const dict of dictTypes) {
    const exists = await prisma.dict.findFirst({ where: { dictType: dict.dictType } })
    if (!exists) {
      await prisma.dict.create({ data: dict })
      console.log(`✅ 已创建字典类型: ${dict.dictName}`)
    } else {
      console.log(`⏭️  字典类型已存在: ${dict.dictName}`)
    }
  }

  // 字典数据
  const dictData = [
    // App用户状态
    { dictSort: 1, dictLabel: '正常', dictValue: '1', dictType: 'app_user_status', listClass: 'success', isDefault: 1, status: 1, remark: '正常状态' },
    { dictSort: 2, dictLabel: '禁用', dictValue: '0', dictType: 'app_user_status', listClass: 'danger', isDefault: 0, status: 1, remark: '禁用状态' },
    
    // 商品状态
    { dictSort: 1, dictLabel: '上架', dictValue: '1', dictType: 'product_status', listClass: 'success', isDefault: 1, status: 1, remark: '商品上架' },
    { dictSort: 2, dictLabel: '下架', dictValue: '0', dictType: 'product_status', listClass: 'info', isDefault: 0, status: 1, remark: '商品下架' },
    
    // 订单状态
    { dictSort: 1, dictLabel: '待发货', dictValue: '0', dictType: 'order_status', listClass: 'warning', isDefault: 1, status: 1, remark: '等待发货' },
    { dictSort: 2, dictLabel: '待收货', dictValue: '1', dictType: 'order_status', listClass: 'primary', isDefault: 0, status: 1, remark: '已发货待收货' },
    { dictSort: 3, dictLabel: '待评价', dictValue: '2', dictType: 'order_status', listClass: 'info', isDefault: 0, status: 1, remark: '已收货待评价' },
    { dictSort: 4, dictLabel: '已完成', dictValue: '3', dictType: 'order_status', listClass: 'success', isDefault: 0, status: 1, remark: '交易完成' },
    
    // 支付状态
    { dictSort: 1, dictLabel: '未支付', dictValue: '0', dictType: 'pay_status', listClass: 'warning', isDefault: 1, status: 1, remark: '待支付' },
    { dictSort: 2, dictLabel: '已支付', dictValue: '1', dictType: 'pay_status', listClass: 'success', isDefault: 0, status: 1, remark: '支付成功' },
    
    // 发货状态
    { dictSort: 1, dictLabel: '未发货', dictValue: '0', dictType: 'delivery_status', listClass: 'info', isDefault: 1, status: 1, remark: '未发货' },
    { dictSort: 2, dictLabel: '已发货', dictValue: '1', dictType: 'delivery_status', listClass: 'primary', isDefault: 0, status: 1, remark: '已发货' },
    { dictSort: 3, dictLabel: '已收货', dictValue: '2', dictType: 'delivery_status', listClass: 'success', isDefault: 0, status: 1, remark: '已收货' },
    
    // 退款状态
    { dictSort: 1, dictLabel: '无退款', dictValue: '0', dictType: 'refund_status', listClass: 'success', isDefault: 1, status: 1, remark: '未申请退款' },
    { dictSort: 2, dictLabel: '申请中', dictValue: '1', dictType: 'refund_status', listClass: 'warning', isDefault: 0, status: 1, remark: '退款申请中' },
    { dictSort: 3, dictLabel: '已退款', dictValue: '2', dictType: 'refund_status', listClass: 'info', isDefault: 0, status: 1, remark: '退款成功' },
    { dictSort: 4, dictLabel: '已拒绝', dictValue: '3', dictType: 'refund_status', listClass: 'danger', isDefault: 0, status: 1, remark: '退款已拒绝' },
    
    // 余额调整类型
    { dictSort: 1, dictLabel: '余额', dictValue: 'money', dictType: 'balance_type', listClass: 'primary', isDefault: 1, status: 1, remark: '调整余额' },
    { dictSort: 2, dictLabel: '积分', dictValue: 'integral', dictType: 'balance_type', listClass: 'success', isDefault: 0, status: 1, remark: '调整积分' },
    
    // 余额调整操作
    { dictSort: 1, dictLabel: '增加', dictValue: 'add', dictType: 'balance_action', listClass: 'success', isDefault: 1, status: 1, remark: '增加余额或积分' },
    { dictSort: 2, dictLabel: '减少', dictValue: 'subtract', dictType: 'balance_action', listClass: 'warning', isDefault: 0, status: 1, remark: '减少余额或积分' },
    
    // 评论评分
    { dictSort: 1, dictLabel: '5星', dictValue: '5', dictType: 'reply_score', listClass: 'success', isDefault: 0, status: 1, remark: '非常满意' },
    { dictSort: 2, dictLabel: '4星', dictValue: '4', dictType: 'reply_score', listClass: 'primary', isDefault: 0, status: 1, remark: '满意' },
    { dictSort: 3, dictLabel: '3星', dictValue: '3', dictType: 'reply_score', listClass: 'warning', isDefault: 1, status: 1, remark: '一般' },
    { dictSort: 4, dictLabel: '2星', dictValue: '2', dictType: 'reply_score', listClass: 'danger', isDefault: 0, status: 1, remark: '不满意' },
    { dictSort: 5, dictLabel: '1星', dictValue: '1', dictType: 'reply_score', listClass: 'danger', isDefault: 0, status: 1, remark: '非常不满意' },
  ]

  for (const data of dictData) {
    const exists = await prisma.dictData.findFirst({
      where: {
        dictType: data.dictType,
        dictValue: data.dictValue,
      },
    })
    if (!exists) {
      await prisma.dictData.create({ data })
      console.log(`✅ 已创建字典数据: ${data.dictType} - ${data.dictLabel}`)
    }
  }

  console.log('✅ 电商字典数据导入完成！')
}

main()
  .catch((e) => {
    console.error('❌ 导入失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

