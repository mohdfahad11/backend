import joi from "joi";
import {
  mandatoryIdValidator,
  optionalIdValidator,
  statusValidator,
} from "../../Utils/joiCommonValidators.js";
export const validateProductCreateForm = (req, res, next) => {
  req.body.quantity = parseInt(req.body.quantity);
  req.body.quantity_unit = parseInt(req.body.quantity_unit);
  req.body.category_id = parseInt(req.body.category_id);
  req.body.price = parseInt(req.body.price);
  req.body.discount = parseInt(req.body.discount);
  req.body.discount_type = parseInt(req.body.discount_type);
  req.body.status = parseInt(req.body.status);
  for (
    let restaurantIdsIterator = 0;
    restaurantIdsIterator < req.body.restaurant_ids.length;
    restaurantIdsIterator++
  ) {
    req.body.restaurant_ids[restaurantIdsIterator] = parseInt(
      req.body.restaurant_ids[restaurantIdsIterator]
    );
  }
  const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().allow("", null),
    quantity: joi.number().strict().required().min(0),
    quantity_unit: joi.number().strict().integer().required(),
    category_id: joi.number().strict().integer().required(),
    price: joi.number().strict().required().min(0),
    barcode: joi.string().allow("", null),
    discount: joi.number().strict().allow("", null),
    discount_type: joi.number().strict().integer().allow("", null),
    status: statusValidator,
    restaurant_ids: joi.array().items(mandatoryIdValidator),
    attachment: joi.allow(null),
  });
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  } else {
    next();
  }
};

export const validateProductUpdateForm = (req, res, next) => {
  req.body.quantity = parseInt(req.body.quantity);
  req.body.quantity_unit = parseInt(req.body.quantity_unit);
  req.body.category_id = parseInt(req.body.category_id);
  req.body.price = parseInt(req.body.price);
  req.body.discount = parseInt(req.body.discount);
  req.body.discount_type = parseInt(req.body.discount_type);
  req.body.status = parseInt(req.body.status);
  for (
    let restaurantIdsIterator = 0;
    restaurantIdsIterator < req.body.restaurant_ids.length;
    restaurantIdsIterator++
  ) {
    req.body.restaurant_ids[restaurantIdsIterator] = parseInt(
      req.body.restaurant_ids[restaurantIdsIterator]
    );
  }

  const schema = joi.object({
    name: joi.string().allow(null),
    description: joi.string().allow("", null),
    quantity: joi.number().strict().min(0).allow(null),
    quantity_unit: joi.number().strict().integer().allow(null),
    category_id: joi.number().strict().integer().allow(null),
    price: joi.number().strict().min(0).allow(null),
    barcode: joi.string().allow("", null),
    discount: joi.number().strict().allow(null),
    discount_type: joi.number().strict().integer().allow(null),
    status: statusValidator,
    created_by: joi.number().strict().integer().allow(null),
    attachment: joi.allow(null),
    restaurant_ids: joi.array().items(optionalIdValidator).allow(null),
  });
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  } else {
    next();
  }
};

export const validateProductCreateMultipleForm = (req, res, next) => {
  const schema = joi.object({
    products: joi.array().items(
      joi.object({
        name: joi.string().required(),
        description: joi.string().allow("", null),
        quantity: joi.number().strict().required().min(0),
        quantity_unit: joi.number().strict().integer().required(),
        category_id: joi.number().strict().integer().required(),
        price: joi.number().strict().required().min(0),
        barcode: joi.string().allow("", null),
        discount: joi.number().strict().allow("", null),
        discount_type: joi.number().strict().integer().allow("", null),
        status: statusValidator,
        attachment: joi.allow(null),
        restaurant_ids: joi.array().items(mandatoryIdValidator).required(),
      })
    ),
  });
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  } else {
    next();
  }
};
