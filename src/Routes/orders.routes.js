import { Router } from 'express'
import { getOrderList, getOrderTypeList, getPaymentMethods, getRefundTypes, createNewOrder, refundOrder, getRefundedOrders, getOrderLineItems, getOneDaySale, getPeriodSale } from '../Controllers/orders.controller.js';
import { validateOrderCreateForm, validateRefundOrderCreateForm } from '../Middleware/validators/orderValidators.middleware.js';
import authenticateUser from '../Middleware/authenticate.middleware.js'
const router = Router();
router.get('/orders', getOrderList)
router.get('/order-types', getOrderTypeList)
router.get('/payment-methods', getPaymentMethods)
router.get('/refund-types', getRefundTypes)
router.post('/order', [validateOrderCreateForm, authenticateUser], createNewOrder)
router.post('/refund', [validateRefundOrderCreateForm, authenticateUser], refundOrder)
router.get('/refunded-orders', getRefundedOrders)
router.get('/order-line-items', getOrderLineItems)
router.get('/one-day-sale', getOneDaySale)
router.get('/period-sale', getPeriodSale)

export default router
