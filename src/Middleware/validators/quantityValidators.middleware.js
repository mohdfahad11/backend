import joi from 'joi'
import { statusValidator } from '../../Utils/joiCommonValidators.js';
export const validateQuantityUnitCreateForm = (req, res, next) => {
  
  const schema = joi.object({
    unit: joi.string()
        .required(),
    status: statusValidator
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateQuantityUnitUpdateForm = (req, res, next) => {
  
  const schema = joi.object({
    unit: joi.string().allow(null),
    status: statusValidator
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateQuantityUnitCreateMultipleForm = (req, res, next) => {
  const schema = joi.object({
    quantity_units: joi.array().items(
      joi.object({
        unit: joi.string()
        .required(),
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