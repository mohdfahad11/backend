import { Router } from 'express'
import userRoutes from './users.routes.js';
import orderRoutes from './orders.routes.js'
import productRoutes from './products.routes.js'
import restaurantRoutes from './restaurants.routes.js'
import quantityRoutes from './quantity.routes.js'
import categoryRoutes from './categories.routes.js'
import paymentGatewaysRoutes from './paymentGateways.routes.js'
import discountRoutes from './discount.routes.js'
import attachmentRoutes from './attachments.routes.js'
import modifierRoutes from './modifiers.routes.js'
import cashupRoutes from './cashups.routes.js'
import advanceCashesRoutes from './advanceCashes.routes.js'
import reportsRoutes from './reports.routes.js'

const router = Router();

router.use('/', userRoutes)
router.use('/', orderRoutes)
router.use('/', productRoutes)
router.use('/', restaurantRoutes)
router.use('/', quantityRoutes)
router.use('/', categoryRoutes)
router.use('/', paymentGatewaysRoutes)
router.use('/', discountRoutes)
router.use('/', attachmentRoutes)
router.use('/', modifierRoutes)
router.use('/', cashupRoutes)
router.use('/', advanceCashesRoutes)
router.use('/', reportsRoutes)

export default router