import joi from 'joi'
import { statusValidator, mandatoryIdValidator, optionalIdValidator } from '../../Utils/joiCommonValidators.js';
export const validateRestaurantSettingsCreateForm = (req, res, next) => {
  
  const schema = joi.object({
    restaurant_id: optionalIdValidator,
    product_vendor_name: joi.string().required(),
    product_name: joi.string().required(),
    product_version: joi.string().required(),
    site_reference: joi.string().allow(null),
    address_line_1: joi.string().required(),
    address_line_2: joi.string().required(),
    show_product_offer_popup: mandatoryIdValidator,
    gst_tax_rate: joi.number().strict().required(),
    gst_ratio: joi.number().strict().required(),
    expected_floating_amount: joi.number().strict().required(),
    status: statusValidator
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateRestaurantSettingsUpdateForm = (req, res, next) => {
  
  const schema = joi.object({
    restaurant_id: optionalIdValidator,
    product_vendor_name: joi.string().allow(null),
    product_name: joi.string().allow(null),
    product_version: joi.string().allow(null),
    site_reference: joi.string().allow(null),
    address_line_1: joi.string().allow(null),
    address_line_2: joi.string().allow(null),
    show_product_offer_popup: optionalIdValidator,
    gst_tax_rate: joi.number().strict().allow(null),
    gst_ratio: joi.number().strict().allow(null),
    expected_floating_amount: joi.number().strict().allow(null),
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

export const validateRestaurantTableListCreateForm = (req, res, next) => {
  const schema = joi.object({
    restaurant_tables: joi.array().items(
      joi.object({
        name: joi.string().required(),
        restaurant_id: mandatoryIdValidator,
        description: joi.string().allow(null),
        status: statusValidator
      })
    )
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateRestaurantProductUpdateForm = (req, res, next) => {
  const schema = joi.object({
    price: joi.number().strict().min(0),
    discount: joi.number().strict()
        .allow('', null),
    discount_type: joi.number().strict()
        .integer().allow('', null),
    status: statusValidator,
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}
