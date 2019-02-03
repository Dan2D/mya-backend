const Adventure = require('../models/adventure')

exports.create = function (req, res) {
    const { name, description, image, nsfw } = req.body
    const adventure = new Adventure({ name, description, image, nsfw, owner: req.user.id })

  adventure.save(function (err) {
    if (err) {
      res.status(500)
        .json({
          message: 'Error adding new adventure, please try again',
          error: err
        })
    } else {
      res.status(201).send(adventure)
    }
  })
}

exports.getAll = function (req, res) {
    Adventure.find({ published: true }, function (err, docs) {
        if (err) {
            res.status(500)
                .json({
                    message: 'Error getting adventures, please try again',
                    error: err
                })
        } else {
            res.status(200)
                .json(docs)
        }
    })
}

exports.getById = function (req, res) {
    const { adventureId } = req.params
    const options = { _id: adventureId }
    Adventure.findOne(options, function (err, doc) {
        if (err) {
            res.status(500)
                .json({
                    message: 'Error getting adventure, please try again',
                    error: err
                })
        }
        else {
            if (!doc.published && req.user.id !== doc.owner) {
                res.status(401).send()
            }
            else {
                res.status(200)
                    .json(doc)
            }

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
        } else {
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
        } else {
            res.status(200).send()
        }
    })
}
