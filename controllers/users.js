const router = require('express').Router()

const { User } = require('../models')
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: { username: `${req.params.username}` },
  })
  if (!user)
    res.status(400).send({ error: 'there is no such user in the grand line' })
  try {
    user.username = req.body.username
    await user.save()
    console.log(user)
    res.json(user)
  } catch (error) {
    console.log('PUT ERROR:', error)
    return error
  }
})

module.exports = router
