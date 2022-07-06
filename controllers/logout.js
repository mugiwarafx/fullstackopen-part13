const router = require('express').Router()

const { Session, User } = require('../models')

const { Op } = require('sequelize')

const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)

  await Session.destroy({
    where: { user_id: user.id },
  })

  user.disabled = true
  await user.save()

  res.status(204).end()
})

module.exports = router
