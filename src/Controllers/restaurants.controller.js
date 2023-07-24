import prisma from '../Services/db.js'
import { updateRestaurantProductStatus, createRestaurantSettings, updateRestaurantSettingsById, updateTable, updateRestaurantProduct, getProductsFromRestaurant } from '../Models/restaurant.model.js'

export const getRestaurantCuisinesList = async (req, res) => {
  let perPage = req.query.per_page ?? 10
  let page = req.query.page ?? 1

  const whereCondition = { restaurant_id: parseInt(req.query.restaurant_id) }

  const cuisines = await prisma.restaurant_cuisines.findMany({
    where: { ...whereCondition },
    select: {
      cuisine_id: true,
      cuisines: {
        select: {
          id: true,
          name: true,
          status: true
        }
      }
    },
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage)
  })

  return res.json({ restaurant_cuisines: cuisines })
}

export const getRestaurantOutletsList = async (req, res) => {
  let perPage = req.query.per_page ?? 10
  let page = req.query.page ?? 1
  const outlets = await prisma.restaurant_outlets.findMany({
    where: { restaurant_id: parseInt(req.query.restaurant_id) },
    select: {
      outlet_id: true,
      outlets: {
        select: {
          id: true,
          name: true,
          status: true
        }
      }
    },
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage)
  })
  return res.json({ restaurant_outlets: outlets })
}

export const getRestaurantProductsList = async (req, res) => {
  let categoryId = req.query.category_id ? parseInt(req.query.category_id) : undefined
  const products = await getProductsFromRestaurant(req)
  const total = await prisma.restaurant_products.count({
    where: {
      restaurant_id: req.query.restaurant_id ? parseInt(req.query.restaurant_id) : undefined,
      products: {
        name: {
          contains: req.query.product_name
        },
        category_id: categoryId
      }
    }
  })
  return res.json({ restaurant_products: products, total: total })
}

export const getRestaurantTimeSlotsList = async (req, res) => {
  const restaurantTimeSlots = await prisma.restaurant_time_slots.findMany({
    where: { restaurant_id: parseInt(req.query.restaurant_id) },
    select: {
      id: true,
      day_of_week: true,
      status: true,
      restaurant_time_slot_hours: {
        select: {
          id: true,
          start_time: true,
          end_time: true
        }
      }
    }
  })
  return res.json({ restaurant_time_slots: restaurantTimeSlots })
}

export const getRestaurantSettings = async (req, res) => {
  const restaurantSettings = await prisma.restaurant_settings.findMany({
    where: { restaurant_id: parseInt(req.query.restaurant_id) }
  })
  return res.json({ restaurant_settings: restaurantSettings })
}

export const createNewRestaurantSettings = async (req, res) => {
  const createdSettings = await createRestaurantSettings(req.body, req.user)
  return res.json({ restaurant_settings: createdSettings })
}

export const updateRestaurantSettings = async (req, res) => {
  const updatedRestaurantSettings = await updateRestaurantSettingsById(req.params.id, req.body);
  return res.json({ restaurant_settings: updatedRestaurantSettings, message: "Restaurant Settings are updated successfully!" })
}

export const getRestaurantTables = async (req, res) => {
  const restaurantTables = await prisma.restaurant_tables.findMany({
    where: { restaurant_id: parseInt(req.query.restaurant_id) }
  })
  const count = await prisma.restaurant_tables.count()
  return res.json({ restaurant_tables: restaurantTables, total: count })
}

export const createRestaurantTableList = async (req, res) => {
  const count = await prisma.restaurant_tables.createMany({
    data: [...req.body.restaurant_tables]
  })
  return res.json({ count: count })
}

export const updateRestaurantTable = async (req, res) => {
  const updatedTable = await updateTable(req.params.restaurant_id, req.params.table_id, req.body)
  return res.json({ restaurant_table: updatedTable, message: "Table is updated successfully!" })
}

export const updateRestaurantProducts = async (req, res) => {
  const updatedRestaurantProduct = await updateRestaurantProduct(req.params.restaurant_product_id, req.body)
  return res.json({ restaurant_product: updatedRestaurantProduct, message: "Restaurant product is updated successfully!" })
}

export const updateRestaurantProductsStatus = async (req, res) => {
  const updatedRestaurantProduct = await updateRestaurantProductStatus(req.body)
  return res.json({ restaurant_product: updatedRestaurantProduct, message: "Restaurant product is updated successfully!" })
}

export const getRestaurants = async (req, res) => {
  const restaurants = await prisma.restaurants.findMany()
  const total = await prisma.restaurants.count()
  return res.json({ restaurants: restaurants, total: total })
}

export const getRestaurantsForProduct = async (req, res) => {
  const restaurants = await prisma.restaurant_products.findMany({
    where: {
      product_id: parseInt(req.query.product_id),
      status: 1
    },
    select: {
      restaurants: {
        select: {
          id: true,
          name: true,
          type: true,
          status: true,
          owner_id: true,
          created_by: true,
          created_at: true
        }
      }
    }
  })
  return res.json(restaurants)
}

export const createRestaurantProduct = async (req, res) => {
  const count = await prisma.restaurant_products.createMany({
    data: [...req.body.restaurant_products.map(allProducts => ({ ...allProducts, created_by: parseInt(req.user.id) }))]
  })
  res.json({ count: count })
}

export const deleteRestaurantProduct = async (req, res) => {
  const deletedRestaurantProduct = await prisma.restaurant_products.deleteMany({
    where: {
      restaurant_id: parseInt(req.params.restaurant_id),
      product_id: parseInt(req.params.product_id)
    }
  })
  res.json(deletedRestaurantProduct)
}

export const getRestaurantSettingsThroughUniqueId = async (req, res) => {
  const restaurantUniqueId = req.params.uniqueId;

  const settings = await prisma.restaurants.findUnique({
    where: {
      restaurant_unique_id: restaurantUniqueId
    },
    select: {
      id: true,
      name: true,
      alternate_phone: true,
      phone: true,
      restaurant_unique_id: true,
      status: true,
      owner_id: true,
      restaurant_settings: true
    }
  })

  if (settings == null) {
    res.status(422);
    return res.json({ message: 'No restaurant found' })
  }

  return res.json(settings)
}