import joi from 'joi'
import { findEmail } from '../../Models/user.model.js'
import { statusValidator, mandatoryIdValidator, optionalIdValidator } from '../../Utils/joiCommonValidators.js';

export const isEmailUninque = async (email, ExternalHelpers) => {
  let emailExists = await findEmail(email)
  if (emailExists) {
    throw new joi.ValidationError(
      "email.exists",
      [
        {
          message: "Email is already in use",
          path: ["email"],
          type: "string.email",
          context: {
            key: "email",
            label: "email",
            email,
          },
        },
      ],
      email
    )
  }
  return true
}

export const validateUserCreateForm = (req, res, next) => {

  const schema = joi.object({
    name: joi.string()
      .min(3)
      .required(),
    password: joi.string()
      .min(6).required(),
    phone_no: joi.string().length(10).pattern(/^[0-9]+$/).allow('', null),
    email: joi.string()
      .email()
      // .required()
      .external(isEmailUninque),
    status: statusValidator,
    role_id: mandatoryIdValidator,
    dob: joi.string().allow(null),
    gender: joi.string().allow(null),
    note: joi.string().allow(null),
    postcode: joi.string().allow(null),
  })
  schema.validateAsync(req.body)
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(422).send(error.details)
    })
}

export const validateUserUpdateForm = (req, res, next) => {

  const schema = joi.object({
    name: joi.string()
      .min(3).allow(null),
    phone_no: joi.string().length(10).pattern(/^[0-9]+$/).allow(null),
    email: joi.string()
      .email().allow(null),
    status: statusValidator,
    role_id: optionalIdValidator,
    password: joi.string().min(6).allow(null),
    dob: joi.string().allow(null),
    gender: joi.string().allow(null),
    note: joi.string().allow(null),
    postcode: joi.string().allow(null),
  })
  if (schema.validate(req.body).error) {
    res.status(422).send(schema.validate(req.body).error.details);
  }
  else {
    next();
  }
}