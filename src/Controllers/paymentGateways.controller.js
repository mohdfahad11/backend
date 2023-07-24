import prisma from '../Services/db.js'
import {createPaymentGatewaySettings, updatePaymentGatewaySettingsById, updatePaymentGatewayStatus} from '../Models/paymentGateway.model.js'

export const getPaymentGateways = async (req, res) => {
  const paymentGateways = await prisma.payment_gateways.findMany()
  return res.json({ payment_gateways: paymentGateways })
}

export const getRestaurantPaymentGatewaySettings = async (req, res) => {
  const restaurantPaymentGetwaySettings = await prisma.restaurant_payment_gateway_settings.findMany({
    where: {
      restaurant_id: parseInt(req.query.restaurant_id)
    },
    select: {
      id: true,
      restaurant_id: true,
      merchant_id: true,
      payment_gateway_id: true,
      payment_gateways: {
        select: {
          id:true,
          gateway: true,
          status: true
        }
      },
      has_integrated_receipt: true,
      has_integrated_surcharge: true,
      created_by: true,
      created_at: true,
      status: true
    }
  })
  return res.json({ restaurant_payment_gateway_settings: restaurantPaymentGetwaySettings})
}

export const createRestaurantPaymentGatewaySettings = async (req, res) => {
  const createdPymentGatewaySettings = await createPaymentGatewaySettings(req.body, req.user);
  return res.json({ payment_gateway: createdPymentGatewaySettings });
} 

export const updatePaymentGatewaySettings = async (req, res) => {
  const updatedPaymentGatewaySettings = await updatePaymentGatewaySettingsById(req.params.restaurant_id, req.params.payment_gateway_id, req.body);
  return res.json({payment_gateway_settings: req.body, message: "Payment gateway settings are updated successfully!", count: updatedPaymentGatewaySettings.count})
}

export const updateRestaurantPaymentGatewayStatus = async (req, res) => {
  const updatedStatus = await updatePaymentGatewayStatus(req.params.restaurant_id, req.params.payment_gateway_id, req.body)
  return res.json({updated_status: updatedStatus})
}