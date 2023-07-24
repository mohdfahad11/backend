import prisma from '../Services/db.js'

export const getCashups = async (req, res) => {
  let restaurantId = req.query.restaurant_id ? parseInt(req.query.restaurant_id) : undefined
  const perPage = req.query.per_page ?? 10
  const page = req.query.page ?? 1

  const whereCondition = {
    restaurant_id: restaurantId
  }

  const cashups = await prisma.cashups.findMany({
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage),
    where: { ...whereCondition }
  })

  const totalCashups = await prisma.cashups.count({
    where: { ...whereCondition }
  })

  return { cashups, total: totalCashups };
}

export const storeCashup = async (cashup, res, createdBy) => {
  const cashUpForTheAskedDate = await prisma.$queryRaw`SELECT * FROM cashups where DATE(cashup_date) = DATE(${cashup.cashup_date})`

  if (cashUpForTheAskedDate.length) {
    return null;
  }

  const settings = await prisma.restaurant_settings.findUnique({
    where: {
      restaurant_id: cashup.restaurant_id
    },
    select: {
      id: true,
      expected_floating_amount: true,
    }
  })

  if (!settings) {
    return null;
  }

  const amountDetails = await prisma.$queryRaw`SELECT order_payment_methods.payment_method_id, method, SUM(amount_paid) AS total_amount_paid
                                FROM order_payment_methods
                                INNER JOIN payment_methods ON payment_methods.id = order_payment_methods.payment_method_id
                                WHERE DATE(order_payment_methods.created_at) = ${cashup.cashup_date}
                                GROUP BY order_payment_methods.payment_method_id`
  let cardAmount = 0;
  let cashAmount = 0;

  amountDetails.forEach(amountDetail => {
    if (amountDetail.method == 'Cash') {
      cashAmount = parseFloat(amountDetail.total_amount_paid);
    } else if (amountDetail.method == 'Card') {
      cardAmount = parseFloat(amountDetail.total_amount_paid)
    }
  })

  const createdCashup = await prisma.cashups.create({
    data: {
      restaurants: { connect: { id: cashup.restaurant_id } },
      cashup_date: new Date(cashup.cashup_date),
      cashup_done_at: new Date().toISOString(),
      float_amount: cashup.float_amount,
      till_amount: cashup.till_amount,
      safedrop_amount: cashup.safedrop_amount,

      eftpos_amount: cardAmount, // Card Amount
      expected_eftpos_amount: cardAmount, // Card Amount
      expected_till_amount: cashAmount, // Cash Amount
      expected_float_amount: parseFloat(settings.expected_floating_amount),

      note: cashup.note ?? null,
      users_cashups_created_byTousers: { connect: { id: parseInt(createdBy.id) } },

      status: 1
    },
  });

  return createdCashup;
}

export const getAvailableCashupDates = async (cashup, res) => {
  const cashupDateFrom = cashup.cashup_date_from;
  const cashupDateTo = cashup.cashup_date_to;
  const restaurantId = cashup.restaurant_id;

  const generatedDates = await prisma.$queryRaw`SELECT generated_dates AS 'missed_cashups_date' FROM ( SELECT ADDDATE('1970-01-01', t4*10000 + t3*1000 + t2*100 + t1*10 + t0) AS generated_dates FROM ( SELECT 0 t0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 ) t0, ( SELECT 0 t1 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 ) t1, ( SELECT 0 t2 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 ) t2, ( SELECT 0 t3 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 ) t3, ( SELECT 0 t4 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 ) t4 ) AS all_dates LEFT JOIN cashups ON DATE(cashups.cashup_date) = generated_dates AND restaurant_id = ${restaurantId} WHERE id IS NULL AND generated_dates BETWEEN ${cashupDateFrom} AND ${cashupDateTo} ORDER BY generated_dates desc`

  return generatedDates.map(generatedDate => generatedDate.missed_cashups_date)
}