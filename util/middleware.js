const logger = require('./logger')

const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const { Blog, User, Readinglist } = require('../models')

const { Op } = require('sequelize')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      console.log(SECRET)
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
}

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

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
  tokenExtractor,
  blogFinder,
}
