import prisma from '../Services/db.js'

export const createQuantityUnit = async (unit) => {
  const createdQuantityUnit = await prisma.quantity_units.create({
    data: {
      unit: unit.unit,
      status: unit.status
    }
  })

  return createdQuantityUnit;
}

export const updateQuantityUnitById = async (quantityUnitId, quantityUnit) => {
  const updatedQuantityUnit = await prisma.quantity_units.update({
    where: { id: parseInt(quantityUnitId) },
    data: {
      unit: quantityUnit.unit,
      status: quantityUnit.status
    }
  })

  return updatedQuantityUnit;
}