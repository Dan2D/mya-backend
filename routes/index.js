const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/users', require('./users'))
router.use('/adventures', require('./adventures'))

router.use('*', function (req, res) {
  res.sendStatus(404)
})

module.exports = router
