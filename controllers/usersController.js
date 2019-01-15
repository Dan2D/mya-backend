const User = require('../models/user')
const crypto = require('crypto')
const Token = require('../models/token')
const emailer = require('../lib/emailer')
const emails = require('../lib/emails')

let { confirmationEmail } = emails

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
          emailer.sendEmail(email, {
            subject: 'Please Confirm your Email',
            html: confirmationEmail(`${process.env.CLIENT_ROOT}/verify?token=${token.token}`)
          }).then(
            () => console.log('yay'),
            err => console.log(err)
          )
        }
      })
      res.sendStatus(201)
    }
  })
}
