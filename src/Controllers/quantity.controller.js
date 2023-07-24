import prisma from '../Services/db.js'
import { createQuantityUnit, updateQuantityUnitById } from '../Models/quantity.model.js'


export const getQuantityUnits = async (req, res) => {
  const perPage = req.query.per_page ?? 10
  const page = req.query.page ?? 1

  const whereCondition = {
    unit: {
      contains: req.query.unit
    },
  }

  const quantityUnits = await prisma.quantity_units.findMany({
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage),
    where: { ...whereCondition }
  })

  const totalQuantityUnits = await prisma.quantity_units.count({
    where: { ...whereCondition }
  })
  return res.json({ quantity_units: quantityUnits, total: totalQuantityUnits })
}

export const createNewQuantityUnit = async (req, res) => {
  const createdQuantityUnit = await createQuantityUnit(req.body);
  return res.json({ quantity_unit: createdQuantityUnit });
}

export const updateQuantityUnit = async (req, res) => {
  const updatedQuantityUnit = await updateQuantityUnitById(req.params.id, req.body);
  return res.json({ quantity_unit: updatedQuantityUnit, message: "Quantity Unit is updated successfully!" })
}

export const createMultipleNewQuantityUnits = async (req, res) => {
  const count = await prisma.quantity_units.createMany({
    data: [...req.body.quantity_units]
  })
  return res.json({ count: count })
}