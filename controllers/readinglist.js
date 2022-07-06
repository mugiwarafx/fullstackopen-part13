const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog, User, Readinglist } = require('../models')
const { SECRET } = require('../util/config')

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

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    console.log('user.id', user.id)
    const blog = await Blog.findByPk(req.body.blogId)
    console.log('blog.id', blog.id)
    console.log('req.body', req.body)
    const newReading = await Readinglist.create({
      blogId: blog.id,
      userId: user.id,
    })
    return res.json(newReading)
  } catch (error) {
    return next(error)
  }
})

module.exports = router
