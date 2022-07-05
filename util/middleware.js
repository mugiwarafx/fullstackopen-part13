const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  logger.error('logger.error error.message', error.message)

  if (error.errors.message === 'Validation isEmail on username failed') {
    console.log('Validation isEmail on username failed')
    return response
      .status(400)
      .send({ error: 'Validation isEmail on username failed' })
  }

  if (error.message === 'Validation error: Validation max on year failed') {
    console.log('Validation max on year failed')
    return response
      .status(400)
      .send({ error: 'Are you writing from the future or what?' })
  }

  if (error.message === 'Validation error: Validation min on year failed') {
    console.log('Validation min on year failed')
    return response.status(400).send({ error: 'Are you Tutankamon or what?' })
  }

  if (error.name === 'SequelizeDatabaseError') {
    console.log({
      PUT: 'PUT request must have this body {likes: integer}',
      POST: 'POST request must have this body {author: string, url: string, title: string, likes: integer}',
      POST: 'PUT request must have this body {username: string}',
    })
    return response.status(400).send({
      error: {
        PUT: 'PUT request must have this body {likes: integer}',
        POST: 'POST request must have this body {author: string, url: string, title: string, likes: integer}',
        POST: 'PUT request must have this body {username: string}',
      },
    })
  }

  next(error)
}

module.exports = {
  errorHandler,
}
