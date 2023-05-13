const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const { protect } = require("../middlewares/authMiddleware")
// const { uploadImage } = require("../middlewares/multer")

// User signup route
router.post("/signup", userController.create);

// // User login route
router.post("/login", userController.login);

// // Update user profile
// router.post("/update", protect,uploadImage.single('avatar'), userController.updateUser);

// Get all users
router.get("/all", userController.findAll);

router.delete("/delete", userController.delete);

module.exports = router;
