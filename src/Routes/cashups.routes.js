import { Router } from 'express';
import { createCashup, getCashupDates, getCashupList } from '../Controllers/cashup.controller.js';
import authenticateUser from '../Middleware/authenticate.middleware.js';
import { validatCashupCreateForm, validatCashupDatesFetch } from '../Middleware/validators/cashups.middleware.js';

const router = Router();

router.get('/cashups', getCashupList)
router.post('/cashup', [authenticateUser, validatCashupCreateForm], createCashup)
router.get('/cashup-dates', [authenticateUser, validatCashupDatesFetch], getCashupDates)

export default router