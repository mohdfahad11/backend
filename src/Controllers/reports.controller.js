import prisma from '../Services/db.js'

export const getPaymentReport = async (req, res) => {
  const transactions = await prisma.order_payment_methods.findMany({
    where: {
      payment_method_id: req.query.payment_method_id ? parseInt(req.query.payment_method_id) : undefined,
      order_id: req.query.order_id ? parseInt(req.query.order_id) : undefined
    },
    select: {
      id: true,
      payment_method_id: true,
      order_id: true,
      amount_paid: true,
      users_order_payment_methods_created_byTousers: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true
        }
      },
      created_at: true
    }
  })

  return res.json({ transactions })
}

export const getTopSoldProducts = async (req, res) => {
  const take = req.query.limit ? parseInt(req.query.limit) : 10;

  // Prisma has limitation, we cannot order by filtered count on relation 🤦‍♂️

  // const products = await prisma.products.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //     description: true,
  //     price: true,
  //     categories: {
  //       select: {
  //         id: true,
  //         category: true
  //       }
  //     },
  //     _count: {
  //       select: {
  //         order_line_items: {
  //           where: {
  //             created_at: {
  //               lte: new Date("2023-04-01"),
  //               gte: new Date("2023-02-15"),
  //             }
  //           },
  //         },
  //       },
  //     },
  //   },

  //   orderBy: {
  //     order_line_items: {
  //       _count: 'desc'
  //     }
  //   },
  //   take
  // })

  const products = await prisma.$queryRaw`SELECT product_id, COUNT(*) AS cnt, products.name, products.description FROM order_line_items LEFT JOIN products ON products.id = order_line_items.product_id WHERE DATE(order_line_items.created_at) BETWEEN ${req.query.date_from} AND ${req.query.date_to} GROUP BY product_id ORDER BY cnt DESC`;
  return res.json({ products })
}

export const getPerHourSellingReport = async (req, res) => {
  const sales = await prisma.$queryRaw`SELECT restaurant_id, SUM(order_line_items.line_item_total) AS sale_made, HOUR(order_line_items.created_at) AS 'hour' FROM order_line_items LEFT JOIN orders ON orders.id = order_line_items.order_id WHERE DATE(order_line_items.created_at) = DATE(${req.query.date}) GROUP BY orders.restaurant_id, HOUR(order_line_items.created_at)`
  return res.json({ sales })
}

export const getTotalSellingPerDayReport = async (req, res) => {
  const sales = await prisma.$queryRaw`SELECT restaurant_id, SUM(order_line_items.line_item_total) AS sale_made, DATE(order_line_items.created_at) AS 'date' FROM order_line_items LEFT JOIN orders ON orders.id = order_line_items.order_id WHERE DATE(order_line_items.created_at) = DATE(${req.query.date}) GROUP BY orders.restaurant_id, DATE(order_line_items.created_at)`
  return res.json({ sales })
}

export const getTotalCashSaleMadeReport = async (req, res) => {
  const sales = await prisma.$queryRaw`SELECT SUM(amount_paid) as total_amount FROM order_payment_methods LEFT JOIN payment_methods ON payment_methods.id = order_payment_methods.payment_method_id WHERE method = 'Cash' AND DATE(order_payment_methods.created_at) = DATE(${req.query.date}) GROUP BY order_payment_methods.payment_method_id`;
  return res.json({ sales: sales.length ? sales[0] : {} })
}

export const getTotalCardSaleMadeReport = async (req, res) => {
  const sales = await prisma.$queryRaw`SELECT SUM(amount_paid) as total_amount FROM order_payment_methods LEFT JOIN payment_methods ON payment_methods.id = order_payment_methods.payment_method_id WHERE method = 'Card' AND DATE(order_payment_methods.created_at) = DATE(${req.query.date}) GROUP BY order_payment_methods.payment_method_id`;
  return res.json({ sales: sales.length ? sales[0] : {} })
}

// Refunds are being considered
export const getTotalSale = async (req, res) => {
  // const sales = await prisma.$queryRaw`SELECT SUM(line_item_total) AS total_amount FROM order_line_items LEFT JOIN order_refunds ON order_refunds.order_line_item_id = order_line_items.id WHERE order_refunds.id IS NULL AND DATE(order_line_items.created_at) BETWEEN DATE(${req.query.date_from}) AND DATE(${req.query.date_to})`
  const sales = await prisma.$queryRaw`SELECT SUM(total_amount - refund_made) AS total_amount FROM (SELECT orders.id, orders.total_amount, SUM(IF(order_refunds.id IS NOT NULL, order_line_items.line_item_total, 0)) AS refund_made FROM orders LEFT JOIN order_line_items ON order_line_items.order_id = orders.id LEFT JOIN order_refunds ON order_refunds.order_line_item_id = order_line_items.id WHERE DATE(orders.created_at) BETWEEN DATE(${req.query.date_from}) AND DATE(${req.query.date_to}) GROUP BY orders.id) AS sales_tbl`;
  return res.json({ sales: sales.length ? sales[0] : {} })
}