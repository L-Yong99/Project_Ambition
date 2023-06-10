const asyncHandler = require("express-async-handler");

// const cloudinaryHelper = require("../utility/cloudinaryHelper");

const db = require("../models");
const Milestone = db.milestones;
const Op = db.Sequelize.Op;

// Create new majorGoal
exports.create = asyncHandler(async (req, res) => {
  await Milestone.create(req, res);
});


// Retrieve all majorGoal from the database.
exports.findAll = asyncHandler(async (req, res) => {
  Milestone.findAll().then((data) => {
    res.json(data);
  });
});


// // Find a single user with an id
// exports.findOne = (req, res) => {

// };

// // Update a user by the id in the request
// exports.update = (req, res) => {

// };

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const { _id } = req.body;

  Milestone.destroy({ where: { id: _id } }).then(() => {
    res.status(200).send('MajorGoal removed Successfully');
   }).catch((err) => {
    console.log(err);
    res.status(500).send('We failed to delete for some reason');
   });

};

// // Delete all majorGoal from the database.
// exports.deleteAll = (req, res) => {

// };

// // Find all published majorGoal
// exports.findAllPublished = (req, res) => {

// };

// Utility Functions
// Generate Token
