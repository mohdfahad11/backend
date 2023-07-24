import prisma from '../Services/db.js'

export const createModifier = async (modifier, createdBy) => {
  const createdModifier = await prisma.modifiers.create({
    data: {
      modifier: modifier.modifier,
      modifier_categories: { connect: { id: parseInt(modifier.modifier_category_id) } },
      status: modifier.status,
      users_modifiers_created_byTousers: { connect: { id: parseInt(createdBy.id) } }
    },
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

  return createdModifier
}

export const updateModifierById = async (modifierId, modifier) => {
  try {

    const updatedModifier = await prisma.modifiers.update({
      where: { id: parseInt(modifierId) },
      data: {
        modifier: modifier.modifier,
        modifier_category_id: modifier.modifier_category_id,
        status: modifier.status,
      },
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

    return updatedModifier;
  } catch (error) {
    throw error
  }
}

export const createModifierCategory = async (modifierCategory) => {
  const createdModifierCategory = await prisma.modifier_categories.create({
    data: {
      modifier_category: modifierCategory.modifier_category,
      status: modifierCategory.status,
      is_mandatory: modifierCategory.is_mandatory,
      is_single_select: modifierCategory.is_single_select,
      seq_no: modifierCategory.seq_no
    }
  })

  return createdModifierCategory
}

export const updateModifierCategoryById = async (modifierCategoryId, modifierCategory) => {
  const updatedModifierCategory = await prisma.modifier_categories.update({
    where: { id: parseInt(modifierCategoryId) },
    data: {
      modifier_category: modifierCategory.modifier_category,
      status: modifierCategory.status,
      is_mandatory: modifierCategory.is_mandatory,
      is_single_select: modifierCategory.is_single_select,
      seq_no: modifierCategory.seq_no
    }
  })

  return updatedModifierCategory;
}

export const updateRestaurantProductModifierById = async (restaurantProductModifierId, restaurantProductModifier) => {
  const updatedRestaurantProductModifier = await prisma.restaurant_product_modifiers.update({
    where: {
      id: parseInt(restaurantProductModifierId)
    },
    data: {
      price: restaurantProductModifier.price,
      status: restaurantProductModifier.status
    }
  })

  return updatedRestaurantProductModifier
}

export const createRestaurantProductModifier = async (modifier, createdBy) => {
  const createdRestaurantProductModifier = await prisma.restaurant_product_modifiers.create({
    data: {
      restaurant_products: { connect: { id: parseInt(modifier.restaurant_product_id) } },
      modifiers: { connect: { id: parseInt(modifier.modifier_id) } },
      status: modifier.status,
      price: modifier.price,
      users_product_modifier_created_byTousers: { connect: { id: parseInt(createdBy.id) } }
    }
  })

  return createdRestaurantProductModifier
}