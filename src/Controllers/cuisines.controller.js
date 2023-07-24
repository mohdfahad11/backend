import prisma from '../Services/db.js'

export const getCuisines = async (req, res) => {
  let perPage = req.query.per_page ?? 10
  let page = req.query.page ?? 1
  const cuisines = await prisma.cuisines.findMany({
    skip: parseInt(perPage) * (parseInt(page) -1 ),
    take: parseInt(perPage)
  })
  return res.json({ cuisines: cuisines })
}
