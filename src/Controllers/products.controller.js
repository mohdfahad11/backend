import prisma from '../Services/db.js'
import { createProduct, updateProductById, getProductsFromMaster } from '../Models/product.model.js'
import { getProductsFromRestaurant } from '../Models/restaurant.model.js'

export const getProducts = async (req, res) => {
  let categoryId = req.query.category_id ? parseInt(req.query.category_id) : undefined
  const products = await getProductsFromMaster(req)
  const totalProducts = await prisma.products.count({
    where: {
      name: {
        contains: req.query.product_name
      },
      category_id: categoryId
    }
  })
  return res.json({ products: products, total: totalProducts })
}

export const createNewProduct = async (req, res) => {
  const createdProduct = await createProduct(req.body, req.files[0], req.user);
  return res.json({ product: createdProduct });
};

export const updateProduct = async (req, res) => {
  const updatedProduct = await updateProductById(req.params.id, req.body)
  return res.json({product: updatedProduct, message: "Product is updated successfully!"})
}

export const createMultipleNewProducts = async (req, res) => {
  let createdProductCount = 0
  //need to use for loop as createmany does not support nested relational querries
  for(let counter = 0 ; counter < req.body.products.length; counter++) {
    const createdProduct = await createProduct(req.body.products[counter], null, req.user);
    if(createdProduct) {
      createdProductCount++
    }
  }
  return res.json({count: createdProductCount})
}

export const getProductsFromMasterIfNotInRestaurantProducts = async (req, res) => {
  const totalRestaurantProducts = await prisma.restaurant_products.count({
    where: {restaurant_id: parseInt(req.query.restaurant_id)}
  })
  if(totalRestaurantProducts == 0) {
    const products = await getProductsFromMaster(req)
    const total = await prisma.products.count()
    return res.json({products: products, total: total})
  } else {
    const products = await getProductsFromRestaurant(req) 
    return res.json({products: products, total: totalRestaurantProducts})
  }

  
}