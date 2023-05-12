const asyncHandler = require("express-async-handler");

// const cloudinaryHelper = require("../utility/cloudinaryHelper");

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new user (Signup)
exports.create = asyncHandler(async (req, res) => {
  await User.signUp(req, res);

});


// Retrieve all users from the database.
exports.findAll = asyncHandler(async (req, res) => {
  // Show all users
  User.findAll().then((data) => {
    res.json(data);
  });
});


// Find a single user with an id
exports.findOne = (req, res) => {

};

// Update a user by the id in the request
exports.update = (req, res) => {

};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  User.destroy({ where: { id: 56 } }).then(() => {
    res.status(200).send('Removed Successfully');
   }).catch((err) => {
    console.log(err);
    res.status(500).send('We failed to delete for some reason');
   });

};

// Delete all users from the database.
exports.deleteAll = (req, res) => {

};

// // Find all published users
// exports.findAllPublished = (req, res) => {

// };

// Utility Functions
// Generate Token
