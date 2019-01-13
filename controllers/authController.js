const jwt = require('jsonwebtoken')
const User = require('../models/user')

const secret = process.env.JWT_SECRET_KEY

exports.login = function(req, res){
  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.error(err)
      res.status(500)
        .json({
          error: 'Internal error please try again'
        })
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        })
    } else {
      user.isValidPassword(password, (err, same) => {
        if (err) {
            res.status(500)
                .json({
                    message: 'Internal error please try again',
                    error: err
                });
        } else if (!user) {
            res.status(401)
                .json({
                    message: 'Incorrect email or password'
                });
        } else {
            user.isValidPassword(password, (err, same) => {
                if (err) {
                    res.status(500)
                        .json({
                            message: 'Internal error please try again',
                            error: err
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            message: 'Incorrect email or password'
                        });
                } else {
                    // Issue token
                  const payload = {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    email
                  };
                  const token = jwt.sign(payload, secret);
                  res.status(200)
                    .json({
                      token: token
                    })
                  res.cookie('token', token, { httpOnly: true })
                      .sendStatus(200);
                }
            });
        }
      })
    }
  })
}
