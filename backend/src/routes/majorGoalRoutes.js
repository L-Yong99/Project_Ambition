const express = require("express");
const router = express.Router();
const majorGoalController = require("../controllers/majorGoalController");
const milestoneController = require("../controllers/milestoneController");
// const { protect } = require("../middlewares/authMiddleware")
// const { uploadImage } = require("../middlewares/multer")

// Create major goal route
router.post("/create", majorGoalController.create);

// Get all major goals
router.get("/all", majorGoalController.findAll);

// Delete one major goal
router.delete("/delete", majorGoalController.delete);



// Create milestone route
router.post("/milestone/create", milestoneController.create);

// Get all major goals
router.get("/milestone/all", milestoneController.findAll);

// Delete one major goal
router.delete("/milestone/delete", milestoneController.delete);

module.exports = router;
