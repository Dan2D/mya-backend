const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const saltRounds = 10

// this will be our data base's data structure
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: 'Username taken.'
    },
    email: {
      type: String,
      required: true,
      unique: 'An account with that email already exists.'
    },
    password: {
      type: String,
      required: true
    },
    lastLogged: {
      type: Date,
      default: Date.now()
    },
    roleID: {
      type: Number,
      default: 3
    }
  },
  { timestamps: true }
)

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', function (next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this
    bcrypt.hash(document.password, saltRounds,
      (err, hashedPassword) => {
        if (err) {
          next(err)
        } else {
          document.password = hashedPassword
          next()
        }
      })
  } else {
    next()
  }
})

UserSchema.methods.isValidPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err)
    } else {
      callback(err, same)
    }
  })
}

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('User', UserSchema)
