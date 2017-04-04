const { expect } = require('chai')
const Joi = require('joi')
const { validate } = require('../')

describe('schema', () => {
  it('should return input when it passes validation', async () => {
    const schema = Joi.string()
    const input = 'string'
    const result = await validate(input, schema)
    expect(result).to.equal(input)
  })

  it('should throw when it fails validation', async () => {
    const schema = Joi.number()
    const input = 'string'
    try {
      await validate(input, schema)
    } catch (err) {
      expect(err.statusCode).to.equal(400)
    }
  })
})
