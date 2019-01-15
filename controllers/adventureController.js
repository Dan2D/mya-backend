const Adventure = require('../models/adventure')

exports.create = function (req, res) {
    const { name, description, image, nsfw } = req.body
    const adventure = new Adventure({ name, description, image, nsfw, owner: req.email })

    adventure.save(function (err) {
        if (err) {
            res.status(500)
                .json({
                    message: 'Error adding new adventure, please try again',
                    error: err
                })
        } else {
            res.status(201).send()
        }
    })
}

exports.get = function (req, res) {
    Adventure.find({ owner: req.email }, function (err, docs) {
        if (err) {
            res.status(500)
                .json({
                    message: 'Error getting your adventures, please try again',
                    error: err
                })
        }
        else {
            res.status(200)
                .json(docs)
        }
    })
}

exports.update = function (req, res) {
    const { adventureId } = req.params

    Adventure.findByIdAndUpdate(adventureId, req.body, { new: true }, function (err, adventure) {
        if (err) {
            res.status(500)
                .json({
                    message: 'Error updating adventure, please try again',
                    error: err
                })
        }
        else {
            console.log(adventure)
            res.status(200)
                .json(adventure)
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