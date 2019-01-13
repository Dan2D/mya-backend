const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const PageSchema = require('./page')

const AdventureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    owner: {
      type: String,
      required: true
    },
    pages: [PageSchema],
    nsfw: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Adventure', AdventureSchema)
