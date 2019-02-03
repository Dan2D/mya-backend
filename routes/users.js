const router = require('express').Router()
const users = require('../controllers/usersController')
const withAuth = require('../lib/middleware')

router.post('/', users.create)
router.get('/:userId/adventures', withAuth, users.getAdventures)

module.exports = router
