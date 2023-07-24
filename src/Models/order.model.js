import prisma from '../Services/db.js'

export const createOrder = async (order, createdBy) => {
  const createdAt = new Date();

  const createdOrder = await prisma.orders.create({
    data: {
      restaurants: { connect: { id: order.restaurant_id } },
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone_number: order.customer_phone_number,
      total_amount: order.total_amount,
      status: order.status,
      order_line_items: {
        create: [...order.order_line_items.map(allOrderLineItems => ({
          product_id: allOrderLineItems.product_id,
          quantity: allOrderLineItems.quantity,
          price: allOrderLineItems.price,
          line_item_total: allOrderLineItems.line_item_total,
          total_amount: allOrderLineItems.total_amount,
          created_by: parseInt(createdBy.id),
          order_modifiers: {
            create: allOrderLineItems.order_modifiers ? [...allOrderLineItems.order_modifiers.map(modifier => ({
              price: modifier.price,
              restaurant_product_modifiers: { connect: { id: modifier.restaurant_product_modifier_id } }
            }))] : undefined
          }
        }))]
      },
      order_payment_methods: {
        create: [...order.order_payment_methods.map(allOrderPaymentMethods => ({ ...allOrderPaymentMethods, created_by: parseInt(createdBy.id) }))]
      },
      users_orders_created_byTousers: { connect: { id: parseInt(createdBy.id) } },
      users_orders_ordered_byTousers: order.ordered_by ? { connect: { id: parseInt(order.ordered_by) } } : undefined,
      order_types: { connect: { id: order.order_type } },
      note: order.note,
      created_at: createdAt,
      delivery_time: order.delivery_time ? new Date(new Date().setTime(createdAt.getTime() + (order.delivery_time * 60 * 1000))).toISOString() : null,
      waiting_time: order.waiting_time ? new Date(new Date().setTime(createdAt.getTime() + (order.waiting_time * 60 * 1000))).toISOString() : null,
      surcharge_amount: order.surcharge_amount ?? null,
      discount: order.discount ?? null,
      discount_reason: order.discount_reason ?? null,
      discount_types: order.discount_type ? { connect: { id: order.discount_type } } : undefined,
      surcharge_types: order.surcharge_type ? { connect: { id: order.surcharge_type } } : undefined,
    },
  });

  return createdOrder;
}

export const refundOrderLineItem = async (order, createdBy) => {

  const refundedOrderLineItem = await prisma.order_refunds.create({
    data: {
      order_line_items: { connect: { id: order.order_line_item_id } },
      refund_types: { connect: { id: order.type } },
      refund_reason: order.refund_reason,
      users_order_refunds_refunded_byTousers: { connect: { id: parseInt(createdBy.id) } },
      users_order_refunds_created_byTousers: { connect: { id: parseInt(createdBy.id) } }
    },
  });

  return refundedOrderLineItem;
}
