const { json } = require('micro')
const Joi = require('joi')

const validate = (input, schema) => new Promise((resolve, reject) => {
  Joi.validate(input, schema, (err, result) => {
    if (err) {
      if (Array.isArray(err.details) && err.details.length > 0) {
        const error = new Error(err.details[0].message)
        error.statusCode = 400
        error.originalError = err
        throw error
      }
      return reject(err)
    }
    return resolve(result)
  })
})

const validateBody = schema => next => async (req, res) => {
  const body = await json(req)
  await validate(body, schema)
  return next(req, res)
}

module.exports = {
  validate,
  validateBody,
}
