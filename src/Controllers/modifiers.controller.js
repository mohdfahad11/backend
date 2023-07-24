import prisma from '../Services/db.js'
import { createModifier, createModifierCategory, updateModifierById, updateModifierCategoryById, createRestaurantProductModifier, updateRestaurantProductModifierById } from '../Models/modifier.model.js'

export const getModifiers = async (req, res) => {
  let perPage = req.query.per_page ?? 10
  let page = req.query.page ?? 1
  let modifierCategoryId = req.query.modifier_category_id ? parseInt(req.query.modifier_category_id) : undefined

  const whereCondition = {
    modifier_category_id: modifierCategoryId,
    modifier: {
      contains: req.query.modifier
    }
  }

  const modifiers = await prisma.modifiers.findMany({
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage),
    where: { ...whereCondition },
    select: {
      id: true,
      modifier: true,
      modifier_category_id: true,
      modifier_categories: {
        select: {
          id: true,
          modifier_category: true,
          seq_no: true,
          is_mandatory: true,
          is_single_select: true,
          status: true
        }
      },
      status: true
    }
  })

  const totalModifiers = await prisma.modifiers.count({ where: { ...whereCondition } })
  return res.json({ modifiers: modifiers, total: totalModifiers })
}


export const getModifierCategories = async (req, res) => {
  let perPage = req.query.per_page ?? 10
  let page = req.query.page ?? 1

  const whereCondition = {
    modifier_category: {
      contains: req.query.modifier_category
    }
  }

  const modifierCategories = await prisma.modifier_categories.findMany({
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage),
    where: { ...whereCondition }
  })

  const totalModifierCategories = await prisma.modifier_categories.count({
    where: { ...whereCondition }
  })
  return res.json({ modifier_categories: modifierCategories, total: totalModifierCategories })
}

export const getRestaurantProductModifiers = async (req, res) => {
  let productId = req.query.restaurant_product_id ? parseInt(req.query.restaurant_product_id) : undefined
  let st = req.query.status ? parseInt(req.query.status) : undefined
  const productModifiers = await prisma.restaurant_product_modifiers.findMany({
    where: {
      restaurant_product_id: productId,
      status: st
    },
    select: {
      id: true,
      restaurant_product_id: true,
      price: true,
      status: true,
      restaurant_products: {
        select: {
          id: true,
          restaurant_id: true,
          product_id: true,
          products: {
            select: {
              id: true,
              name: true,
              description: true,
              quantity: true,
              quantity_unit: true,
              quantity_units: {
                select: {
                  id: true,
                  unit: true,
                  status: true
                }
              },
              price: true,
              barcode: true,
              discount: true,
              discount_type: true,
              category_id: true,
              categories: {
                select: {
                  id: true,
                  category: true,
                  status: true
                }
              },
              status: true,
            }
          },
          price: true,
          discount: true,
          discount_type: true,
          discount_types: {
            select: {
              id: true,
              type: true
            }
          }
        }
      },

      modifier_id: true,
      modifiers: {
        select: {
          id: true,
          modifier: true,
          modifier_category_id: true,
          modifier_categories: {
            select: {
              id: true,
              modifier_category: true,
              seq_no: true,
              is_mandatory: true,
              is_single_select: true,
              status: true
            }
          },
          status: true
        }
      }
    }
  })

  const totalRestaurantProductModifiers = await prisma.restaurant_product_modifiers.count({
    where: {
      restaurant_product_id: productId
    }
  })
  return res.json({ restaurant_product_modifiers: productModifiers, total: totalRestaurantProductModifiers })
}

export const createNewModifier = async (req, res) => {
  const createdModifier = await createModifier(req.body, req.user);
  return res.json({ modifier: createdModifier });
};

export const updateModifier = async (req, res) => {
  try {
    const updatedModifier = await updateModifierById(req.params.id, req.body);
    return res.json({ modifier: updatedModifier, message: "Modifier is updated successfully!" })
  } catch (error) {
    return res.status(400).json({ message: 'Modifier already exists' })
  }
}

export const createNewModifierCategory = async (req, res) => {
  const createdModifierCategory = await createModifierCategory(req.body, req.user);
  return res.json({ modifier_category: createdModifierCategory });
};

export const updateModifierCategory = async (req, res) => {
  const updatedModifierCategory = await updateModifierCategoryById(req.params.id, req.body);
  return res.json({ modifier_category: updatedModifierCategory, message: "Modifier category is updated successfully!" })
}

export const createNewRestaurantProductModifier = async (req, res) => {
  const createdRestaurantProductModifier = await createRestaurantProductModifier(req.body, req.user);
  return res.json({ restaurant_product_modifier: createdRestaurantProductModifier });
};

export const updateRestaurantProductModifier = async (req, res) => {
  const updatedRestaurantProductModifier = await updateRestaurantProductModifierById(req.params.id, req.body);
  return res.json({ restaurant_product_modifier: updatedRestaurantProductModifier, message: "Product Modifier is updated successfully!" })
}

export const createMultipleNewModifierCategories = async (req, res) => {
  const count = await prisma.modifier_categories.createMany({
    data: [...req.body.modifier_categories]
  })
  return res.json({ count: count })
}

export const createMultipleNewModifiers = async (req, res) => {
  const count = await prisma.modifiers.createMany({
    data: [...req.body.modifiers.map(allModifiers => ({ ...allModifiers, created_by: parseInt(req.user.id) }))]
  })
  return res.json({ count: count })
}

export const createMultipleNewRestaurantProductModifiers = async (req, res) => {
  const count = await prisma.restaurant_product_modifiers.createMany({
    data: [...req.body.restaurant_product_modifiers.map(allModifiers => ({ ...allModifiers, created_by: parseInt(req.user.id) }))]
  })
  return res.json({ count: count })
}
