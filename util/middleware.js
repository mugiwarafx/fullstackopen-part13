const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

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
