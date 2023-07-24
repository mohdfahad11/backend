import { Router } from 'express';
import { createAdvanceCash, getAdvanceCashesList } from '../Controllers/advanceCashes.controller.js';
import authenticateUser from '../Middleware/authenticate.middleware.js';
import { validateAdvanceCashCreateForm } from '../Middleware/validators/advanceCashes.middleware.js';

const router = Router();

router.get('/advance-cashes', getAdvanceCashesList)
router.post('/advance-cash', [authenticateUser, validateAdvanceCashCreateForm], createAdvanceCash)

export default router