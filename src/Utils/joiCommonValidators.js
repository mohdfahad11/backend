import joi from 'joi'

export const statusValidator = joi.number().strict().integer().min(0).max(1).allow(null)

export const phoneNoValidator = joi.string().length(10).pattern(/^[0-9]+$/).allow(null)

export const optionalIdValidator = joi.number().strict().integer().allow(null)

export const mandatoryIdValidator = joi.number().strict().integer().required()