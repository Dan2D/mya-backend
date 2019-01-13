const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/users', require('./users'))
router.use('/adventure', require('./adventure'))

router.use('*', (req, res) => {
  res.status(404).send('Not found.')
})

module.exports = router
