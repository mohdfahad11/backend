import prisma from "../Services/db.js";

export const createDiscountType =  async (discountType) => {
  const createdDiscountType = await prisma.discount_types.create({
    data: {
      type: discountType.type
    }
  })
  return createdDiscountType
}

export const updateType =  async (id,discountType) => {
  const updatedDiscountType = await prisma.discount_types.update({
    where: { id: parseInt(id)},
    data: {
      type: discountType.type
    }
  })
  return updatedDiscountType
}