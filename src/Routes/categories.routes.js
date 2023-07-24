import { Router } from 'express'
import { getCategories, createNewCategory, updateCategory, createMultipleNewCategories } from '../Controllers/categories.controller.js'
import authenticateUser from '../Middleware/authenticate.middleware.js';
import { uploadFile, uploadNoFile } from '../Middleware/multer.middleware.js';
import { validateCategoryCreateForm, validateCategoryUpdateForm, validateCategoryCreateMultipleForm} from '../Middleware/validators/categoryValidators.middleware.js';

const router = Router();
router.get('/categories', getCategories)
router.post('/category', [authenticateUser, uploadFile, validateCategoryCreateForm], createNewCategory)
router.post('/import-categories', [authenticateUser, validateCategoryCreateMultipleForm], createMultipleNewCategories)
router.patch('/category/:id', [authenticateUser, uploadNoFile, validateCategoryUpdateForm], updateCategory)

export default router