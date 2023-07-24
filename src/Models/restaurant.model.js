import prisma from '../Services/db.js'

export const createRestaurantSettings = async (settings, createdBy) => {
  const settingsRecord = await prisma.restaurant_settings.findUnique({
    where: {
      restaurant_id: parseInt(settings.restaurant_id)
    }
  })
  if(settingsRecord == null) {
    const createdRestaurantSettings = await prisma.restaurant_settings.create({
      data: {
        restaurants: { connect: { id: settings.restaurant_id}},
        product_vendor_name: settings.product_vendor_name,
        product_name: settings.product_name,
        product_version: settings.product_version,
        site_reference: settings.site_reference,
        address_line_1: settings.address_line_1,
        address_line_2: settings.address_line_2,
        show_product_offer_popup: settings.show_product_offer_popup,
        gst_tax_rate: settings.gst_tax_rate,
        gst_ratio: settings.gst_ratio,
        expected_floating_amount: settings.expected_floating_amount,
        status: settings.status,
        users_restaurant_settings_created_byTousers: { connect: {id: parseInt(createdBy.id) }}
      },
    });
    return createdRestaurantSettings;
  }

  return {message: "Settings are already created for the restaurant!"};
}

export const updateRestaurantSettingsById = async (restaurantId, settings) => {
  const updatedSettings = await prisma.restaurant_settings.update({
    where: { restaurant_id: parseInt(restaurantId) },
    data: {
      product_vendor_name: settings.product_vendor_name,
      product_name: settings.product_name,
      product_version: settings.product_version,
      site_reference: settings.site_reference,
      address_line_1: settings.address_line_1,
      address_line_2: settings.address_line_2,
      show_product_offer_popup: settings.show_product_offer_popup,
      gst_tax_rate: settings.gst_tax_rate,
      gst_ratio: settings.gst_ratio,
      expected_floating_amount: settings.expected_floating_amount,
      status: settings.status,
    }
  })

  return updatedSettings;
}

export const updateTable = async (restaurantId, tableId, data) => {
  const updatedTable = await prisma.restaurant_tables.updateMany({
    where: {
      restaurant_id: parseInt(restaurantId),
      id: parseInt(tableId)
    },
    data: {
      name: data.name,
      description: data.description,
      status: data.status
    }
  })
  return updatedTable
}

export const updateRestaurantProduct = async ( restauranProductId, product) => {
  const updatedProduct = await prisma.restaurant_products.updateMany({
    where: {
      id: parseInt(restauranProductId)
    },
    data: {
      price: product.price,
      discount: product.discount,
      discount_type: product.discount_type,
      status: product.status
    }
  })

  return updatedProduct
}

export const updateRestaurantProductStatus = async (product) => {
  const updatedProduct = await prisma.restaurant_products.updateMany({
    where: {
      restaurant_id: product.restaurant_id ? parseInt(product.restaurant_id) : undefined,
      product_id: product.product_id ? parseInt(product.product_id) : undefined
    },
    data: {
      status: product.status
    }
  })
  return updatedProduct
}


export const getProductsFromRestaurant = async (req) => {
  let categoryId = req.query.category_id ? parseInt(req.query.category_id) : undefined
  let perPage = req.query.per_page ?? 10
  let page = req.query.page ?? 1
  const products = await prisma.restaurant_products.findMany({
    where: {
      restaurant_id: req.query.restaurant_id ? parseInt(req.query.restaurant_id): undefined,
      products: {
        name: {
          contains: req.query.product_name
        },
        category_id: categoryId
      }
    },
    select: {
      id: true,
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
          discount_types: {
            select: {
              id: true,
              type: true
            }
          },
          category_id: true,
          categories: {
            select: {
              id: true,
              category: true,
              status: true
            }
          },
          status: true,
          created_at: true,
          created_by: true
        }
      },
      restaurants: {
        select: {
          id: true,
          name: true,
          owner_id: true,
          status: true
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
      },
      status: true,
    },
    skip: parseInt(perPage) * (parseInt(page) -1 ),
    take: parseInt(perPage)
  })
   return products
}