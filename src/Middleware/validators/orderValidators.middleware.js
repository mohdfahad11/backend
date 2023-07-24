import joi from 'joi'
import { phoneNoValidator, statusValidator, optionalIdValidator, mandatoryIdValidator } from '../../Utils/joiCommonValidators.js';

export const validateOrderCreateForm = (req, res, next) => {

  const schema = joi.object({
    customer_name: joi.string().allow('', null),
    customer_email: joi.string().email().allow('', null),
    customer_phone_number: phoneNoValidator,
    total_amount: joi.number().strict().min(0),
    note: joi.string().allow('', null),
    discount_reason: joi.string().allow('', null),
    status: statusValidator,
    order_line_items: joi.array().items(
      joi.object({
        table_id: optionalIdValidator,
        product_id: mandatoryIdValidator,
        quantity: joi.number().strict().integer().required().min(0),
        price: joi.number().strict().required().min(0),
        line_item_total: joi.number().strict().required().min(0),
        total_amount: joi.number().strict().required().min(0),
        order_modifiers: joi.array().items(
          joi.object({
            restaurant_product_modifier_id: mandatoryIdValidator,
            price: joi.number().strict().required(),
          })
        )
      })
    )
      .min(1),
    order_payment_methods: joi.array().items(
      joi.object({
        payment_method_id: mandatoryIdValidator,
        amount_paid: joi.number().strict().required(),
        status: statusValidator,
      })
    )
      .min(1),
    order_type: mandatoryIdValidator,
    surcharge_amount: joi.number().strict().integer().allow(null),
    discount: joi.number().strict().integer().allow(null),
    discount_type: joi.number().strict().integer().allow(null),
    surcharge_type: joi.number().strict().integer().allow(null),
    restaurant_id: mandatoryIdValidator,
    ordered_by: joi.number().allow(null),
    delivery_time: joi.number().allow(null),
    waiting_time: joi.number().allow(null),
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateRefundOrderCreateForm = (req, res, next) => {

  const schema = joi.object({
    order_line_item_id: mandatoryIdValidator,
    type: mandatoryIdValidator,
    refund_reason: joi.string().allow('', null),
    status: statusValidator
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}
