import prisma from '../Services/db.js'

export const getAdvanceCashes = async (req, res) => {
  let restaurantId = req.query.restaurant_id ? parseInt(req.query.restaurant_id) : undefined
  const perPage = req.query.per_page ?? 10
  const page = req.query.page ?? 1

  const whereCondition = {
    restaurant_id: restaurantId
  }

  const advanceCashes = await prisma.advance_cashes.findMany({
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage),
    where: { ...whereCondition }
  })

  const totalAdvanceCashes = await prisma.advance_cashes.count({
    where: { ...whereCondition }
  })

  return { advanceCashes, total: totalAdvanceCashes };
}

export const storeAdvanceCash = async (advanceCash, res, createdBy) => {
  const advanceCashForTheAskedDate = await prisma.$queryRaw`SELECT * FROM advance_cashes where DATE(date) = DATE(UTC_TIMESTAMP)`

  if (advanceCashForTheAskedDate.length) {
    return null;
  }

  const settings = await prisma.restaurant_settings.findUnique({
    where: {
      restaurant_id: advanceCash.restaurant_id
    },
    select: {
      id: true,
      expected_floating_amount: true,
    }
  })

  if (!settings) {
    return null;
  }

  const createdAdvanceCash = await prisma.advance_cashes.create({
    data: {
      restaurants: { connect: { id: advanceCash.restaurant_id } },
      date: new Date().toISOString(),
      advance_amount: advanceCash.advance_amount,
      note: advanceCash.note ?? null,
      expected_float_amount: parseFloat(settings.expected_floating_amount),
      users_advance_cashes_created_byTousers: { connect: { id: parseInt(createdBy.id) } }
    },
  });

  return createdAdvanceCash;
}