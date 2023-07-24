import joi from 'joi'
import { mandatoryIdValidator } from '../../Utils/joiCommonValidators.js';

export const validatCashupCreateForm = (req, res, next) => {
  const schema = joi.object({
    restaurant_id: mandatoryIdValidator,
    cashup_date: joi.date().required(),
    float_amount: joi.number().required(),
    till_amount: joi.number().required(),
    safedrop_amount: joi.number().required(),
    note: joi.string().allow(null)
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}

export const validatCashupDatesFetch = (req, res, next) => {
  if (req.query.restaurant_id) {
    req.query.restaurant_id = parseInt(req.query.restaurant_id);
  }

  const schema = joi.object({
    restaurant_id: mandatoryIdValidator,
    cashup_date_from: joi.date().required(),
    cashup_date_to: joi.date().required(),
  })

  if (schema.validate(req.query).error) {
    res.status(422).send(schema.validate(req.query).error.details);
  }
  else {
    next();
  }
}