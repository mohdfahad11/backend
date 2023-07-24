import joi from 'joi'

export const validateTopProductSoldReport = (req, res, next) => {
  const schema = joi.object({
    date_from: joi.string().required(),
    date_to: joi.string().required(),
    limit: joi.number().allow(null),
  })

  if (schema.validate(req.query).error) {
    res.status(422).send(schema.validate(req.query).error.details);
  }
  else {
    next();
  }
}

export const validatePerHourSaleReport = (req, res, next) => {
  const schema = joi.object({
    date: joi.string().required(),
  })

  if (schema.validate(req.query).error) {
    res.status(422).send(schema.validate(req.query).error.details);
  }
  else {
    next();
  }
}

export const validateReportForDate = (req, res, next) => {
  const schema = joi.object({
    date: joi.string().required(),
  })

  if (schema.validate(req.query).error) {
    res.status(422).send(schema.validate(req.query).error.details);
  }
  else {
    next();
  }
}

export const validateReportForTotalSale = (req, res, next) => {
  const schema = joi.object({
    date_from: joi.string().required(),
    date_to: joi.string().required(),
  })

  if (schema.validate(req.query).error) {
    res.status(422).send(schema.validate(req.query).error.details);
  }
  else {
    next();
  }
}
