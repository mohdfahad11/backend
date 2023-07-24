import { Router } from 'express'
import { getPaymentGateways, getRestaurantPaymentGatewaySettings, createRestaurantPaymentGatewaySettings, updatePaymentGatewaySettings, updateRestaurantPaymentGatewayStatus } from '../Controllers/paymentGateways.controller.js';
import {validateRestaurantPaymentGatewayCreateForm, validateRestaurantPaymentGatewayUpdateForm} from '../Middleware/validators/paymentGatewayValidators.js';
import  authenticateUser from '../Middleware/authenticate.middleware.js'

const router = Router();
router.get('/payment-gateways', getPaymentGateways)
router.get('/restaurant-payment-gateway-settings', getRestaurantPaymentGatewaySettings)
router.post('/restaurant-payment-gateway-settings', [validateRestaurantPaymentGatewayCreateForm, authenticateUser], createRestaurantPaymentGatewaySettings)
router.patch('/restaurant-payment-gateway-settings/:restaurant_id/:payment_gateway_id', [authenticateUser, validateRestaurantPaymentGatewayUpdateForm], updatePaymentGatewaySettings)
router.patch('/restaurant-payment-gateway-settings/status/:restaurant_id/:payment_gateway_id', authenticateUser, updateRestaurantPaymentGatewayStatus)

export default router