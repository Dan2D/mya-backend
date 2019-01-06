const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hello Users World!")
});

module.exports = router;