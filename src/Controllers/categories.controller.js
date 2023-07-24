import prisma from '../Services/db.js'
import { createCategory, updateCategoryById } from '../Models/category.model.js'

export const getCategories = async (req, res) => {
  let perPage = req.query.per_page ?? 10
  let page = req.query.page ?? 1
  let restaurantId = req.query.restaurant_id ? parseInt(req.query.restaurant_id) : undefined

  const whereCondition = {
    category: {
      contains: req.query.category_name
    }
  }

  const categories = await prisma.categories.findMany({
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage),
    where: { ...whereCondition },
    select: {
      id: true,
      category: true,
      status: true,
      products: {
        where: {
          status: 1
        },
        select: {
          id: true,
          name: true,
          description: true,
          quantity: true,
          quantity_units: {
            select: {
              id: true,
              unit: true,
            }
          },
          price: true,
          discount: true,
          discount_types: {
            select: {
              id: true,
              type: true
            }
          },
          barcode: true,
          status: true,
          restaurant_products: {
            where: {
              restaurant_id: restaurantId,
              status: 1
            },
            select: {
              id: true,
              price: true,
              discount: true,
              discount_types: {
                select: {
                  id: true,
                  type: true
                }
              }
            }
          }
        }
      }
    }
  })
  const totalCategories = await prisma.categories.count({
    where: { ...whereCondition }
  })
  return res.json({ categories: categories, total: totalCategories })
}

export const createNewCategory = async (req, res) => {
  const createdCategory = await createCategory(req.body, req.files[0], req.user);
  return res.json({ category: createdCategory });
};

export const updateCategory = async (req, res) => {
  const updatedCategory = await updateCategoryById(req.params.id, req.body);
  return res.json({ category: updatedCategory, message: "Category is updated successfully!" })
}

export const createMultipleNewCategories = async (req, res) => {
  let createdCategoryCount = 0
  //need to use for loop as createmany does not support nested relational queries
  for (let counter = 0; counter < req.body.categories.length; counter++) {
    const createdCategory = await createCategory(req.body.categories[counter], null, req.user);
    if (createdCategory) {
      createdCategoryCount++
    }
  }
  return res.json({ count: createdCategoryCount })
}