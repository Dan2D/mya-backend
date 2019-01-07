const router = require('express').Router();
const auth = require('../controllers/authController');
const withAuth = require('../lib/middleware');

router.post('/', auth.login);

router.get('/token', withAuth, (req, res) => {
    res.sendStatus(200);
})

module.exports = router;