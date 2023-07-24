import { Router } from 'express'
import authenticateUser from '../Middleware/authenticate.middleware.js';
import { getQuantityUnits, createNewQuantityUnit, updateQuantityUnit, createMultipleNewQuantityUnits } from '../Controllers/quantity.controller.js';
import {validateQuantityUnitCreateForm, validateQuantityUnitUpdateForm, validateQuantityUnitCreateMultipleForm} from '../Middleware/validators/quantityValidators.middleware.js';
const router = Router();
router.get('/quantity-units', getQuantityUnits)
router.post('/quantity-unit', [authenticateUser, validateQuantityUnitCreateForm], createNewQuantityUnit)
router.patch('/quantity-unit/:id', [authenticateUser, validateQuantityUnitUpdateForm], updateQuantityUnit)
router.post('/import-quantity-units', [authenticateUser, validateQuantityUnitCreateMultipleForm], createMultipleNewQuantityUnits)

export default router