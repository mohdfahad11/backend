import joi from 'joi'
import { statusValidator } from '../../Utils/joiCommonValidators.js';
export const validateCategoryCreateForm = (req, res, next) => {
  req.body.status = parseInt(req.body.status)
  const schema = joi.object({
    category: joi.string()
        .required(),
    status: statusValidator,
    attachment: joi.allow(null)
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateCategoryCreateMultipleForm = (req, res, next) => {
  const schema = joi.object({
    categories: joi.array().items(
      joi.object({
        category: joi.string()
        .required(),
        status: statusValidator,
        attachment: joi.allow(null)
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

export const validateCategoryUpdateForm = (req, res, next) => {
  req.body.status = parseInt(req.body.status)
  const schema = joi.object({
    category: joi.string().allow(null),
    status: statusValidator,
    attachment: joi.allow(null)
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}
