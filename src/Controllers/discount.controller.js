import prisma from "../Services/db.js";
import { updateType, createDiscountType } from "../Models/discount.model.js";

export const getDiscountTypes = async (req, res) => {
  const perPage = req.query.per_page ?? 10
  const page = req.query.page ?? 1
  const whereCondition = {
    type: {
      contains: req.query.type
    }
  };

  const totalDiscountTypes = await prisma.discount_types.count({ where: { ...whereCondition } })

  const discountTypes = await prisma.discount_types.findMany({
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage),
    where: { ...whereCondition }
  })
  return res.json({ discount_types: discountTypes, total: totalDiscountTypes })
}

export const createNewDiscountType = async (req, res) => {
  const createdDiscountType = await createDiscountType(req.body)
  return res.json({ discount_type: createdDiscountType })
}

export const updateDiscountType = async (req, res) => {
  const updatedDiscountType = await updateType(req.params.id, req.body)
  return res.json({ discount_type: updatedDiscountType, message: "Discount type is updated successfully!" })
}

export const createMultipleNewDiscountTypes = async (req, res) => {
  const count = await prisma.discount_types.createMany({
    data: [...req.body.discount_types]
  })
  return res.json({ count: count })
}