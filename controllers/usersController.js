const User = require('../models/user')
const crypto = require('crypto')
const Token = require('../models/token')
const emailer = require('../lib/emailer')
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET_KEY

exports.fetchAll = function (req, res) {
  res.json()
}

exports.create = function (req, res) {
  const { username, email, password } = req.body
  const user = new User({ username, email, password })
  user.save(function (err) {
    if (err) {
      let errMsg, errors
      if (err.name === 'ValidationError') {
        errors = Object.values(err.errors).map(error => {
          let { message } = error
          return { message }
        })
      } else {
        errMsg = 'An unexpected error occurred, please try again.'
      }
      res.status(500)
        .json({
          errors,
          code: 500,
          message: errMsg
        })
    } else {
      const token = new Token({ userId: user._id, token: crypto.randomBytes(16).toString('hex') })
      token.save(function (err) {
        if (err) console.log(err)
        else {
          emailer.sendConfirmationEmail(email, token).then(
            () => console.log('yay'),
            err => console.log(err)
          )
        }
      })
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
      const userToken = jwt.sign(payload, secret)
      res.status(201).json({
        token: userToken
      })
    }
  })
}
