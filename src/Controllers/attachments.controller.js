import prisma from '../Services/db.js'
import { updateAttachmentDetails, updateAttachmentStatus, createNewAttachment } from '../Models/attachment.model.js'

export const getAttachment = async (req, res) => {
  let moduleType = req.query.module_type? parseInt(req.query.module_type) : undefined
  let moduleId = req.query.module_id? parseInt(req.query.module_id) : undefined
  const attachments = await prisma.attachments.findMany({
    where: {
      module_type: moduleType ,
      module_id: moduleId,
      status: "Uploaded"
    }
  })
  return res.json({ attachment: attachments })
}

export const createAttachment = async (req, res) => {
  const attachment = await createNewAttachment(req.body, req.files[0], req.user)
  return res.json({attachment: attachment})
}

export const updateAttachment = async (req, res) => {
  const attachment = await updateAttachmentDetails(req.params.module_type,req.params.attachment_id, req.params.module_id, req.files[0], req.body)
  return res.json({attachment: attachment, message: "Image is updated succesfully!"})
}

export const deleteAttachment = async (req, res) => {
  const attachment = await updateAttachmentStatus(req.params.attachment_id,req.params.module_type, req.params.module_id)
  return res.json({attachment: attachment, message: "Image is deleted succesfully!"})
}