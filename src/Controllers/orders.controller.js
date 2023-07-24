import prisma from '../Services/db.js'
import { createOrder, refundOrderLineItem } from '../Models/order.model.js'

export const createNewOrder = async (req, res) => {
  const createdOrder = await createOrder(req.body, req.user);
  return res.json({ order: createdOrder });
};

export const getOrderList = async (req, res) => {
  let perPage = req.query.per_page ?? 10
  let page = req.query.page ?? 1

  const whereCondition = {
    customer_name: {
      contains: req.query.customer_name
    },
    created_at: {
      gte: req.query.created_at_from ? new Date(new Date(req.query.created_at_from).setUTCHours(24, 0, 0, 0)) : undefined,
      lte: req.query.created_at_to ? new Date(new Date(req.query.created_at_to).setUTCHours(47, 59, 59, 0)) : undefined
    },
    id: req.query.id ? parseInt(req.query.id) : undefined
  };

  const orders = await prisma.orders.findMany({
    where: { ...whereCondition },
    orderBy: {
      created_at: 'desc'
    },
    select: {
      id: true,
      customer_name: true,
      customer_email: true,
      customer_phone_number: true,
      total_amount: true,
      created_at: true,
      status: true,
      note: true,
      type: true,
      discount: true,
      discount_reason: true,
      discount_type: true,
      discount_types: true,
      surcharge_amount: true,
      surcharge_type: true,
      delivery_time: true,
      waiting_time: true,
      restaurants: {
        select: {
          id: true,
          name: true
        }
      },
      order_types: {
        select: {
          id: true,
          type: true,
          status: true
        }
      },
      ordered_by: true,
      users_orders_ordered_byTousers: {
        select: {
          id: true,
          name: true,
          phone_no: true,
          email: true,
          created_at: true
        }
      },
      order_line_items: {
        select: {
          id: true,
          table_id: true,
          product_id: true,
          quantity: true,
          price: true,
          line_item_total: true,
          created_by: true,
          created_at: true,
          restaurant_tables: {
            select: {
              id: true,
              name: true,
              status: true
            }
          },
          order_modifiers: {
            select: {
              id: true,
              price: true,
              restaurant_product_modifiers: {
                select: {
                  modifiers: {
                    select: {
                      id: true,
                      modifier: true,
                    }
                  }
                }
              }
            }
          },
          products: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true
            }
          }
        }
      },

      order_payment_methods: {
        select: {
          id: true,
          payment_method_id: true,
          payment_methods: {
            select: {
              id: true,
              method: true,
              status: true
            }
          },
          amount_paid: true,
          status: true,
          created_at: true
        }
      },
      users_orders_created_byTousers: {
        select: {
          id: true,
          name: true,
          role_id: true,
          email: true,
          username: true,
        }
      }
    },
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage)
  })

  const totalOrders = await prisma.orders.count({
    where: { ...whereCondition },
  })
  return res.json({ orders: orders, total: totalOrders })
}

export const getOrderTypeList = async (req, res) => {
  const orderTypes = await prisma.order_types.findMany()
  return res.json({ order_types: orderTypes })
}

export const getPaymentMethods = async (req, res) => {
  const paymentMethods = await prisma.payment_methods.findMany()
  return res.json({ payment_methods: paymentMethods })
}

export const getRefundTypes = async (req, res) => {
  const refundTypes = await prisma.refund_types.findMany()
  return res.json({ refund_types: refundTypes })
}

export const refundOrder = async (req, res) => {
  const refundedOrderLineItem = await refundOrderLineItem(req.body, req.user);
  return res.json({ refunded_order_line_item: refundedOrderLineItem });
}

export const getRefundedOrders = async (req, res) => {
  let perPage = req.query.per_page ?? 10
  let page = req.query.page ?? 1
  let orderLineItemId = req.query.order_line_item_id ? parseInt(req.query.order_line_item_id) : undefined

  const whereCondition = {
    order_line_item_id: orderLineItemId,
    created_at: {
      gte: req.query.created_at_from ? new Date(new Date(req.query.created_at_from).setUTCHours(24, 0, 0, 0)) : undefined,
      lte: req.query.created_at_to ? new Date(new Date(req.query.created_at_to).setUTCHours(47, 59, 59, 0)) : undefined
    },
  }

  const refundedOrders = await prisma.order_refunds.findMany({
    where: { ...whereCondition },
    orderBy: {
      created_at: 'desc'
    },
    select: {
      id: true,
      order_line_item_id: true,
      order_line_items: {
        select: {
          id: true,
          order_id: true,
          orders: {
            select: {
              id: true,
              type: true,
              order_types: {
                select: {
                  id: true,
                  type: true,
                  status: true
                }
              },
              customer_email: true,
              customer_name: true,
              customer_phone_number: true,
              total_amount: true,
              status: true,
              created_at: true,
              created_by: true,
            }
          },
          quantity: true,
          price: true,
          line_item_total: true,
          status: true,
          created_at: true,
          table_id: true,
          restaurant_tables: {
            select: {
              id: true,
              name: true,
              status: true
            }
          },
          product_id: true,
          products: {
            select: {
              id: true,
              name: true,
              price: true,
              status: true
            }
          }
        }
      },
      type: true,
      refund_types: {
        select: {
          id: true,
          type: true,
          status: true
        }
      },
      refund_reason: true,
      refunded_by: true,
      created_at: true,
      status: true
    },
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage)
  })

  const total = await prisma.order_refunds.count({
    where: { ...whereCondition },
  })
  return res.json({ refunded_orders: refundedOrders, total: total })
}

export const getOrderLineItems = async (req, res) => {
  const orderLineItems = await prisma.order_line_items.findMany({
    where: {
      order_id: req.query.order_id ? parseInt(req.query.order_id) : undefined
    },
    select: {
      order_id: true,
      table_id: true,
      product_id: true,
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          categories: {
            select: {
              id: true,
              category: true
            }
          },
          quantity: true,
          quantity_units: {
            select: {
              id: true,
              unit: true
            }
          }
        }
      },
      quantity: true,
      price: true,
      line_item_total: true,
    }
  })
  return res.json({ order_line_items: orderLineItems })
}

export const getOneDaySale = async (req, res) => {
  const sale = await prisma.orders.aggregate({
    _sum: {
      total_amount: true
    },
    where: {
      created_at: new Date(new Date(req.query.date).setUTCHours(0, 0, 0, 0))
    }
  })
  return res.json({ sale_of_day: sale })
}

export const getPeriodSale = async (req, res) => {
  const sale = await prisma.orders.aggregate({
    _sum: {
      total_amount: true
    },
    where: {
      created_at: {
        gte: new Date(new Date(req.query.from_date).setUTCHours(24, 0, 0, 0)),
        lte: new Date(new Date(req.query.to_date).setUTCHours(47, 59, 59, 0))
      },
    }
  })
  return res.json({ sale_of_period: sale })
}