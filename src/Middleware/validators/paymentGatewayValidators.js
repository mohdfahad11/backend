import joi from 'joi'
import { statusValidator, mandatoryIdValidator, optionalIdValidator } from '../../Utils/joiCommonValidators.js';

export const validateRestaurantPaymentGatewayCreateForm = (req, res, next) => {
  
  const schema = joi.object({
    restaurant_id: mandatoryIdValidator,
    payment_gateway_id: mandatoryIdValidator,
    merchant_id: joi.string().allow('', null),
    has_integrated_surcharge: statusValidator,
    has_integrated_receipt: statusValidator,
    status: statusValidator
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateRestaurantPaymentGatewayUpdateForm = (req, res, next) => {
  
  const schema = joi.object({
    restaurant_id: optionalIdValidator,
    payment_gateway_id: optionalIdValidator,
    merchant_id: joi.string().allow(null),
    has_integrated_surcharge: statusValidator,
    has_integrated_receipt: statusValidator,
    status: statusValidator,
    created_by: optionalIdValidator
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}