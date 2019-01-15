const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/users', require('./users'))
router.use('/adventure', require('./adventure'))

router.use('*', function (req, res) {
  res.sendStatus(404)
})

module.exports = router
