import { Router } from 'express'
import { getCuisines } from '../Controllers/cuisines.controller.js';

const router = Router();
router.get('/cuisines', getCuisines)

export default router