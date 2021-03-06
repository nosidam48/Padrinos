const db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const upload = require("../services/file-upload")
const singleUpload = upload.single("selectedFile");

// Defining methods for the kidsController
module.exports = {
  // Function to find all kids
  findAllUnsponsored: (req, res) => {
    db.kids.findAll({
      where: {
        need_sponsor: true
      }
    })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  // Function to find 2 random unsponsored kids for the home page
  findRandom: (req, res) => {
    db.kids.findAll({
      where: {
        need_sponsor: true
      },
      order: [
        Sequelize.fn('RAND'),
      ],
      limit: 2
    })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err))
  },

  // Function to let admin search for a kid by first/last name
  kidSearchName: (req, res) => {
    db.kids.findAll({
      where: {
        [Op.or]: [
          {
            first_name: {
              [Op.like]: "%" + req.body.searchTerm + "%"
            }
          },
          {
            last_name: {
              [Op.like]: "%" + req.body.searchTerm + "%"
            }
          }
        ]
      }
    })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },

  // Function to let admin search for a kid by location
  kidSearchLocation: (req, res) => {
    db.kids.findAll({
      where: {
        location: req.body.searchTerm
      }
    })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },

  // Function to upload kid profile image to S3
  uploadProfilePhoto: (req, res) => {
    singleUpload(req, res, function (err) {
      if (err) {
        return res.status(422).send({ errors: [{ title: "File Upload Error", detail: err.message }] })
      }
      return res.json({ "imageUrl": req.file.location })
    })
  },

  // Function to add kid from form data
  create: (req, res) => {
    db.kids.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      birth_date: req.body.birth_date,
      grade: req.body.grade,
      location: req.body.location,
      kid_bio: req.body.kid_bio,
      need_sponsor: true,
      profile_image: req.body.selectedFile
    }).then(kidData => res.json(kidData))
      .catch(err => res.status(422).json(err));
  },

  //A database call to find one kid by a passed in id
  findOneKid: (req, res) => {
    //req.params
    db.kids.findOne({
      where: {
        id: req.params.id
      },
      include: [db.content]
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(422).json(err))
  },

  // Function to update kid from admin edits
  update: (req, res) => {
    db.kids.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(kidData => res.json(kidData))
      .catch(err => res.status(422).json(err));
  },
  // Function to remove kid from db
  remove: (req, res) => {
    db.kids.destroy(
      {
        where: {
          id: req.params.id
        }
      }).then(kidData => res.json(kidData))
      .catch(err => res.status(422).json(err));
  },

  kidSearch: (req, res) => {
    // Create object to hold where statement variables
    let whereStatement = {};

    // Check to see if values are present. If not, discard them
    if (req.body.location) {
      whereStatement.location = req.body.location
    }
    if (req.body.gender) {
      whereStatement.gender = req.body.gender
    }

    db.kids.findAll({
      where: whereStatement
    }).then(data => res.json(data))
      .catch(err => res.status(422).json(err))
  }
};


