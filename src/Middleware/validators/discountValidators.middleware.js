import joi from 'joi'
import { statusValidator } from '../../Utils/joiCommonValidators.js';
export const validateDiscountTypeCreateForm = (req, res, next) => {
  
  const schema = joi.object({
    type: joi.string()
        .required()
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateDiscountTypeUpdateForm = (req, res, next) => {
  
  const schema = joi.object({
    type: joi.string().allow(null),
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateDiscountTypeCreateMultipleForm = (req, res, next) => {
  const schema = joi.object({
    discount_types: joi.array().items(
      joi.object({
        type: joi.string()
        .required(),
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