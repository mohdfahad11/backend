import prisma from '../Services/db.js'

export const createProduct = async (product, attachment, createdBy) => {
  let uploadedPath, partialPath, ext, createdAttachment = null
  const createdProduct = await prisma.products.create({
    data: {
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      quantity_units: { connect: { id: product.quantity_unit } },
      categories: { connect: { id: product.category_id } },
      price: product.price,
      barcode: product.barcode,
      discount: product.discount,
      discount_types: product.discount_type ? { connect: { id: product.discount_type } } : undefined,
      status: product.status,
      users_products_created_byTousers: { connect: { id: parseInt(createdBy.id) } },
      restaurant_products: {
        create: [...product.restaurant_ids.map(restaurantId => ({
          restaurants: { connect: { id: restaurantId } },
          users_restaurant_products_created_byTousers: { connect: { id: parseInt(createdBy.id) } }
        }))]
      }
    },
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
      created_at: true,
      created_by: true
    },
  });

  if (attachment) {
    uploadedPath = process.env.URL
    partialPath = attachment.path.substring(attachment.path.indexOf('\\') + 1)
    partialPath = partialPath.split('\\').join('/')
    ext = attachment.originalname.substring(attachment.originalname.lastIndexOf('.') + 1, attachment.originalname.length)
    createdAttachment = await prisma.attachments.create({
      data: {
        attachment_type: 1, //1: image
        module_type: 2, // 1.Category, 2. Products
        module_id: createdProduct.id,
        original_file_name: attachment.originalname,
        extension: ext,
        status: "Uploaded",
        upload_path: uploadedPath + partialPath,
        mime_type: attachment.mimetype,
        users_attachments_created_byTousers: { connect: { id: parseInt(createdBy.id) } }
      }
    })
  }

  if (product.attachment && product.attachment !== '') {
    let url = process.env.URL + 'images/' + product.attachment
    ext = product.attachment.substring(product.attachment.lastIndexOf('.') + 1, product.attachment.length)
    createdAttachment = await prisma.attachments.create({
      data: {
        attachment_type: 1, //1: image
        module_type: 2, // 1.Category, 2. Products
        module_id: createdProduct.id,
        original_file_name: product.attachment,
        extension: ext,
        status: "Uploaded",
        upload_path: url,
        mime_type: ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'jpg' ? 'image/jpeg' : 'image/png',
        users_attachments_created_byTousers: { connect: { id: parseInt(createdBy.id) } }
      }
    })
  }
  return { createdProduct, createdAttachment };
}


export const updateProductById = async (productId, product) => {
  const updatedProduct = await prisma.products.update({
    where: { id: parseInt(productId) },
    data: {
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      quantity_unit: product.quantity_unit,
      category_id: product.category_id,
      price: product.price,
      barcode: product.barcode,
      discount: product.discount,
      discount_type: product.discount_type,
      status: product.status,
    },
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
      created_at: true,
      created_by: true
    },
  })
  return updatedProduct;
}

export const getProductsFromMaster = async (req) => {
  let perPage = req.query.per_page ?? 10
  let page = req.query.page ?? 1
  let categoryId = req.query.category_id ? parseInt(req.query.category_id) : undefined
  const products = await prisma.products.findMany({
    where: {
      name: {
        contains: req.query.product_name
      },
      category_id: categoryId
    },
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
      created_at: true,
      created_by: true
    },
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage)
  })

  return products
}
