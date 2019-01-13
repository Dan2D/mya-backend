const router = require('express').Router()
const adventure = require('../controllers/adventureController')
const withAuth = require('../lib/middleware')

router.post('/', withAuth, adventure.create)

module.exports = router