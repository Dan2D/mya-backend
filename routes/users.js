const router = require('express').Router();
const users = require('../controllers/usersController');

router.post('/',users.create);

module.exports = router;