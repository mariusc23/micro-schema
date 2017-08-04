# micro-schema

> Microservice schema validation middleware.

## Installation

    npm install --save @mariusc23/micro-schema

## Usage

This package is meant to be used in conjunction with:

- [@mariusc23/micro-middleware](https://github.com/mariusc23/micro-middleware)
- [@mariusc23/micro-error-handler](https://github.com/mariusc23/micro-error-handler)

```js
// index.js

const { applyMiddleware } = require('@mariusc23/micro-middleware')
const { errorHandler } = require('@mariusc23/micro-error-handler')
const { router } = require('@mariusc23/micro-router')
const { ping } = require('./pages/ping')

const middleware = [
  errorHandler,
]

const handler = router({
  '/ping': ping,
})

module.exports = applyMiddleware(middleware, handler)
```

```js
// pages/ping.js

const { json } = require('micro')
const Joi = require('joi')
const { validate } = require('@mariusc23/micro-schema')

const schema = Joi.object().keys({
  pong: Joi.string().required(),
})

const ping = async (req, res) => {
  const data = await validate(await json(req), schema)
  // if data is valid, continues to here, otherwise throws
  console.log(data.pong)
  return data
}

module.exports = {
  ping,
}
```

## License

Copyright (c) 2017 Marius Craciunoiu. Licensed under the MIT license.
