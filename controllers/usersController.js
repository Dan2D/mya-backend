const User = require('../models/user')

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
      res.sendStatus(201)
    }
  })
}
