import { Router } from 'express'
import { getAttachment, updateAttachment, deleteAttachment, createAttachment } from '../Controllers/attachments.controller.js';
import authenticateUser from '../Middleware/authenticate.middleware.js';
import { uploadFile } from '../Middleware/multer.middleware.js';
const router = Router();

router.get('/attachments', getAttachment)
router.patch('/attachment/:attachment_id/:module_type/:module_id', [authenticateUser, uploadFile], updateAttachment)
router.patch('/attachment/status/:attachment_id/:module_type/:module_id', authenticateUser, deleteAttachment)
router.post('/attachment', [uploadFile, authenticateUser], createAttachment)

export default router