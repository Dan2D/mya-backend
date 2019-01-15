const jwt = require('jsonwebtoken')
const User = require('../models/user')

const secret = process.env.JWT_SECRET_KEY

function errCallback (err, res) {
  res.status(500)
    .json({
      errors: err,
      code: 500,
      message: 'An unexpected error occurred, please try again.'
    })
}

exports.login = function (req, res) {
  const { username, password } = req.body
  User.findOne({
    $or: [
      { username },
      { email: username }
    ]
  }).exec(function (err, user) {
    if (err) {
      return errCallback(err, res)
    }
    if (user) {
      user.isValidPassword(password, function (err, same) {
        if (err) {
          return errCallback(err, res)
        } else if (same) {
          // Issue token
          const payload = {
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
          }
          const token = jwt.sign(payload, secret)
          res.status(200).json({ token: token })
        } else {
          res.status(401)
            .json({
              message: 'Incorrect email or password'
            })
        }
      })
    } else {
      res.status(401)
        .json({
          message: 'Incorrect email or password'
        })
    }
  })
}
