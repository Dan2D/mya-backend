const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Token = require('../models/token')

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
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              roleID: user.roleID,
              verified: user.verified
            }
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

exports.verify = function (req, res) {
  const { token } = req.body
  Token.findOne({
    token
  }).exec(function (err, token) {
    if (err) return errCallback(err, res)
    else if (!token) {
      res.status(400).json({
        type: 'InvalidToken',
        code: 400,
        message: 'Invalid token.'
      })
    } else {
      User.findOne({
        _id: token.userId
      }).exec(function (err, user) {
        if (err) return errCallback(err, res)
        else if (!user) res.status(500).json({ code: 500, message: 'No user found.' })
        else {
          user.verified = true
          user.save(function (err) {
            if (err) res.status(500).json({ code: 500, message: 'An error occurred verifying the user.' })
            else res.sendStatus(200)
          })
        }
      })
    }
  })
}
