const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ChoiceSchema = require('./choice')
const AdventureSchema = require('./adventure')

const PageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    adventureId: {
        type: AdventureSchema,
        require: true
    },
    description: String,
    image: String,
    choices: [ChoiceSchema]
})

module.exports = PageSchema