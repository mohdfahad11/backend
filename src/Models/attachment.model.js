import prisma from "../Services/db.js";

export const createNewAttachment = async(data, attachment, createdBy) => {
  let uploadedPath = process.env.URL
  let partialPath = attachment.path.substring(attachment.path.indexOf('\\') + 1)
  partialPath = partialPath.split('\\').join('/')
  let ext = attachment.originalname.substring(attachment.originalname.lastIndexOf('.') + 1, attachment.originalname.length)
  const createdAttachment = await prisma.attachments.create({
    data: {
      attachment_type: 1, //1: image
      module_type: parseInt(data.module_type), // 1.Category, 2. Products
      module_id: parseInt(data.module_id),
      original_file_name:attachment.originalname,
      extension: ext,
      status: "Uploaded",
      upload_path: uploadedPath + partialPath,
      mime_type: attachment.mimetype,
      users_attachments_created_byTousers: { connect: {id: parseInt(createdBy.id)}}
    }
  })
return createdAttachment
}

export const updateAttachmentDetails = async (moduleType, id, moduleId, attachment, data) => {
  let uploadedPath, partialPath, ext
  uploadedPath = process.env.URL
  partialPath = attachment.path.substring(attachment.path.indexOf('\\') + 1)
  partialPath = partialPath.split('\\').join('/')
  ext = attachment.originalname.substring(attachment.originalname.lastIndexOf('.') + 1, attachment.originalname.length)
  const updatedAttachment = await prisma.attachments.updateMany({
    where: {
      id: parseInt(id),
      module_id: parseInt(moduleId),
      module_type: parseInt(moduleType)
    },
    data: {
      original_file_name:attachment.originalname,
      extension: ext,
      status: "Uploaded",
      upload_path:uploadedPath + partialPath,
      mime_type: attachment.mimetype,
    }
  })
  return updatedAttachment
}

export const updateAttachmentStatus = async (id, moduleType, moduleId) => {
  const updatedAttachment = await prisma.attachments.updateMany({
    where: {
      id: parseInt(id),
      module_id: parseInt(moduleId),
      module_type: parseInt(moduleType)
    },
    data: {
      status: "Deleted",
    }
  })
  return updatedAttachment
}