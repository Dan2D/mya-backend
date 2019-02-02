const router = require('express').Router()
const adventures = require('../controllers/adventuresController')
const withAuth = require('../lib/middleware')

router.post('/', withAuth, adventures.create)
router.delete('/:adventureId', withAuth, adventures.delete)
router.put('/:adventureId', withAuth, adventures.update)
router.get('/', withAuth, adventures.get)

module.exports = router
