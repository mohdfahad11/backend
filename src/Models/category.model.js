import prisma from '../Services/db.js'

export const createCategory = async (category, attachment, createdBy) => {
  let uploadedPath, partialPath, ext, createdAttachment = null
  
  const createdCategory = await prisma.categories.create({
    data: {
      category: category.category,
      status: category.status,
    },
  });
  if(attachment) {
    uploadedPath = process.env.URL
    partialPath = attachment.path.substring(attachment.path.indexOf('\\') + 1)
    partialPath = partialPath.split('\\').join('/')
    ext = attachment.originalname.substring(attachment.originalname.lastIndexOf('.') + 1, attachment.originalname.length)
    createdAttachment = await prisma.attachments.create({
      data: {
        attachment_type: 1, //1: image
        module_type: 1, // 1.Category, 2. Products
        module_id: createdCategory.id,
        original_file_name:attachment.originalname,
        extension: ext,
        status: "Uploaded",
        upload_path: uploadedPath + partialPath,
        mime_type: attachment.mimetype,
        users_attachments_created_byTousers: { connect: {id: parseInt(createdBy.id)}}
      }
    })
  }

  if(category.attachment && category.attachment !== '') {
    let url = process.env.URL + 'images/' + category.attachment
    ext = category.attachment.substring(category.attachment.lastIndexOf('.') + 1, category.attachment.length)
    createdAttachment = await prisma.attachments.create({
      data: {
        attachment_type: 1, //1: image
        module_type: 1, // 1.Category, 2. Products
        module_id: createdCategory.id,
        original_file_name:category.attachment,
        extension: ext,
        status: "Uploaded",
        upload_path: url,
        mime_type: ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'jpg' ? 'image/jpeg' : 'image/png',
        users_attachments_created_byTousers: { connect: {id: parseInt(createdBy.id)}}
      }
    })
  }

  return {createdCategory, createdAttachment};
}

export const updateCategoryById = async (categoryId, category) => {
  const updatedUser = await prisma.categories.update({
    where: { id: parseInt(categoryId) },
    data: {
      category: category.category,
      status: category.status
    }
  })

  return updatedUser;
}

