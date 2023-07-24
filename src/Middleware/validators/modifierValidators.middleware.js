import joi from 'joi'
import { mandatoryIdValidator, optionalIdValidator, statusValidator } from '../../Utils/joiCommonValidators.js';
export const validateModifierCategoryCreateForm = (req, res, next) => {
  req.body.status = req.body.status!=null ? parseInt(req.body.status) : undefined
  req.body.is_mandatory = req.body.is_mandatory != null ? parseInt(req.body.is_mandatory) : undefined
  req.body.is_single_select = req.body.is_single_select != null ? parseInt(req.body.is_single_select) : undefined
  req.body.seq_no = req.body.seq_no != null ? parseInt(req.body.seq_no) : undefined
  const schema = joi.object({
    modifier_category: joi.string()
        .required(),
    status: statusValidator,
    is_mandatory: statusValidator,
    is_single_select: statusValidator,
    seq_no: mandatoryIdValidator

  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}


export const validateModifierCategoryUpdateForm = (req, res, next) => {
  req.body.status = req.body.status!=null ? parseInt(req.body.status) : undefined
  req.body.is_mandatory = req.body.is_mandatory != null ? parseInt(req.body.is_mandatory) : undefined
  req.body.is_single_select = req.body.is_single_select != null ? parseInt(req.body.is_single_select) : undefined
  req.body.seq_no = req.body.seq_no != null ? parseInt(req.body.seq_no) : undefined
  const schema = joi.object({
    modifier_category: joi.string().allow(null),
    status: statusValidator,
    is_mandatory: statusValidator,
    is_single_select: statusValidator,
    seq_no: optionalIdValidator
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateModifierCreateForm = (req, res, next) => {
  req.body.status = req.body.status!=null ? parseInt(req.body.status) : undefined
  const schema = joi.object({
    modifier: joi.string()
        .required(),
    modifier_category_id: joi.number().strict()
        .integer()
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


export const validateModifierUpdateForm = (req, res, next) => {
  req.body.status = req.body.status!=null ? parseInt(req.body.status) : undefined
  const schema = joi.object({
    modifier: joi.string().allow(null),
    modifier_category_id: joi.number().strict()
      .integer().allow(null),
    status: statusValidator
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateRestaurantProductModifierCreateForm = (req, res, next) => {
  req.body.status = req.body.status!=null ? parseInt(req.body.status) : undefined
  const schema = joi.object({
    restaurant_product_id: joi.number().strict()
        .integer()
        .required(),
    modifier_id: joi.number().strict()
        .integer()
        .required(),
    price: joi.number().strict().min(0).required(),
    status: statusValidator
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateRestaurantProductModifierUpdateForm = (req, res, next) => {
  req.body.status = req.body.status!=null ? parseInt(req.body.status) : undefined
  const schema = joi.object({
    price: joi.number().strict().min(0),
    status: statusValidator
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validateModifierCategoryCreateMultipleForm = (req, res, next) => {
  const schema = joi.object({
    modifier_categories: joi.array().items(
      joi.object({
        modifier_category: joi.string()
        .required(),
        status: statusValidator,
        is_mandatory: statusValidator,
        is_single_select: statusValidator,
        seq_no: optionalIdValidator
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

export const validateModifierCreateMultipleForm = (req, res, next) => {
  const schema = joi.object({
    modifiers: joi.array().items(
      joi.object({
        modifier: joi.string()
          .required(),
        modifier_category_id: joi.number().strict()
          .integer()
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

export const validateRestaurantProductModifierCreateMultipleForm = (req, res, next) => {
  // req.body.status = req.body.status!=null ? parseInt(req.body.status) : undefined
  const schema = joi.object({
    restaurant_product_modifiers: joi.array().items(
      joi.object({
        restaurant_product_id: joi.number().strict()
            .integer()
            .required(),
        modifier_id: joi.number().strict()
            .integer()
            .required(),
        price: joi.number().strict().min(0).required(),
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
