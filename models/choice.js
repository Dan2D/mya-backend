const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ChoiceSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  pageId: {
    type: ObjectId,
    required: true
  }
})

module.exports = ChoiceSchema
