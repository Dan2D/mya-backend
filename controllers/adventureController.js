const Adventure = require('../models/adventure')

exports.create = function (req, res) {
    const { name, description, image, nsfw } = req.body
    console.log(req.body)
    console.log(res.email)

    // res.sendStatus(200)
    const adventure = new Adventure({ name, description, image, nsfw, owner: res.email })

    adventure.save(function (err) {
        if (err) {
            res.status(500)
                .json({
                    message: 'Error adding new adventure, please try again.',
                    error: err
                })
        } else {
            res.status(201).send()
        }
    })
}

exports.delete = function (req, res) {
    const { adventureId } = req.params

    Adventure.deleteOne({ _id: adventureId }, function (err) {
        if (err) {
            res.status(500)
                .json({
                    message: 'Error deleteing adventure, please try again',
                    error: err
                })
        }
        else {
            res.status(200).send()
        }
    })
}