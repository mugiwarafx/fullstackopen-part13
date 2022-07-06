const router = require('express').Router()

const { Blog, User } = require('../models')

const { Op } = require('sequelize')

const { tokenExtractor, blogFinder } = require('../util/middleware')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
      ],
    }
  }

  const blogs = await Blog.findAll({
    order: [['likes', 'DESC']],
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
  })

  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    console.log('req.body', req.body)
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
    })
    return res.json(blog)
  } catch (error) {
    return next(error)
  }
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = req.blog

  if (blog.author === user.username) {
    await blog.destroy()
    res.json(blog)
  }

  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res, next) => {
  if (!req.blog.likes)
    res.status(400).send({ error: 'api accepst likes: integer' })
  try {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } catch (error) {
    return next(error)
  }
})

// ex12 was already done
module.exports = router
