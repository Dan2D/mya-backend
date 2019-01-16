const router = require('express').Router()
const auth = require('../controllers/authController')
const withAuth = require('../lib/middleware')

router.post('/', auth.login)

router.post('/verify', auth.verify)

router.post('/confirm-token', auth.sendNewToken)

router.get('/token', withAuth, function (req, res) {
  res.sendStatus(200)
})

module.exports = router
