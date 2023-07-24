import { Router } from 'express'
import authenticateUser from '../Middleware/authenticate.middleware.js';
import { getDiscountTypes, createNewDiscountType, updateDiscountType, createMultipleNewDiscountTypes } from '../Controllers/discount.controller.js';
import {validateDiscountTypeCreateForm, validateDiscountTypeUpdateForm, validateDiscountTypeCreateMultipleForm} from '../Middleware/validators/discountValidators.middleware.js';
const router = Router();
router.get('/discount-types', getDiscountTypes)
router.post('/discount-type', [authenticateUser, validateDiscountTypeCreateForm], createNewDiscountType)
router.patch('/discount-type/:id', [authenticateUser, validateDiscountTypeUpdateForm], updateDiscountType)
router.post('/import-discount-types', [authenticateUser, validateDiscountTypeCreateMultipleForm], createMultipleNewDiscountTypes)

export default router