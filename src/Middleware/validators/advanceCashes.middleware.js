import joi from 'joi'
import { mandatoryIdValidator } from '../../Utils/joiCommonValidators.js';

export const validateAdvanceCashCreateForm = (req, res, next) => {
  const schema = joi.object({
    restaurant_id: mandatoryIdValidator,
    advance_amount: joi.required(),
    note: joi.string().allow(null)
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}