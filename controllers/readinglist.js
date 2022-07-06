const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog, User, Readinglist } = require('../models')
const { SECRET } = require('../util/config')

const { Op } = require('sequelize')

const { tokenExtractor, blogFinder } = require('../util/middleware')

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

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const readingList = await Readinglist.findByPk(req.params.id)
    const blog = await Blog.findByPk(readingList.blogId)
    if (blog.author === user.name) {
      readingList.is_read = req.body.read
      await readingList.save()
      res.json(readingList)
    }
  } catch (error) {
    return next(error)
  }
})

module.exports = router
