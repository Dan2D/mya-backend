const User = require('../models/user');

exports.fetchAll = function (req, res) {
    res.json();
};

exports.create = function (req, res) {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    user.save(function (err) {
        if (err) {
            res.status(500)
                .json({
                    message: "Error registering new user please try again.",
                    error: err
                });
        } else {
            res.status(200).json({message: "Welcome to the club!"});
        }
    })
};
