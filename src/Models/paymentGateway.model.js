import prisma from '../Services/db.js'

export const createPaymentGatewaySettings = async (paymentGatewaySetting, createdBy) => {
  const paymentGateway = await prisma.restaurant_payment_gateway_settings.findFirst({
    where: {
      restaurant_id: parseInt(paymentGatewaySetting.restaurant_id),
      payment_gateway_id: parseInt(paymentGatewaySetting.payment_gateway_id)
    }
  })

  if(paymentGateway == null) {
    const createdPymentGatewaySettings = await prisma.restaurant_payment_gateway_settings.create({
      data: {
        restaurants: { connect: { id: paymentGatewaySetting.restaurant_id}},
        payment_gateways: { connect: { id: paymentGatewaySetting.payment_gateway_id }},
        merchant_id: paymentGatewaySetting.merchant_id,
        has_integrated_surcharge: paymentGatewaySetting.has_integrated_surcharge,
        has_integrated_receipt: paymentGatewaySetting.has_integrated_receipt,
        status: paymentGatewaySetting.status,
        users_restaurant_payment_gateway_settings_created_byTousers: { connect: { id: parseInt(createdBy.id)}}
      },
    });

    return createdPymentGatewaySettings;
  }
  return {message: "Payment gateway settings for the restaurant is already created!"}
}

export const updatePaymentGatewaySettingsById = async (restaurantId, paymentGatewayId, settings) => {
  const updatedPaymentGatewaySetting = await prisma.restaurant_payment_gateway_settings.updateMany({
    where: { 
      restaurant_id: parseInt(restaurantId),
      payment_gateway_id: parseInt(paymentGatewayId)
    },
    data: {
      merchant_id: settings.merchant_id,
      has_integrated_surcharge: settings.has_integrated_surcharge,
      has_integrated_receipt: settings.has_integrated_receipt,
      status: settings.status,
    }
  })

  return updatedPaymentGatewaySetting;
}

export const updatePaymentGatewayStatus = async (restaurantId, paymentGatewayId, status) => {
  const updatedStatus = await prisma.restaurant_payment_gateway_settings.updateMany({
    where: {
        restaurant_id: parseInt(restaurantId),
        payment_gateway_id: parseInt(paymentGatewayId)
    },
    data: {
      status: status.status
    }
  })
  const updateOther = await prisma.restaurant_payment_gateway_settings.updateMany({
    where: {
      restaurant_id: parseInt(restaurantId) ,
      payment_gateway_id: {
        not: parseInt(paymentGatewayId)
      }
    },
    data: {
      status: +!(status.status)
    }
  })
  return updatedStatus
}