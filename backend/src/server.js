const express = require("express");
const colors = require("colors");
require("dotenv").config();
// const { errorHandler } = require("./middlewares/errorMiddleware");
// const connectDB = require("./config/db");

// const cloudinaryHelper = require("./utility/cloudinaryHelper")
// const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

/**
 * =============================================================================
 * Connect PostgreSQL
 * =============================================================================
 */
// connectDB();

/**
 * =============================================================================
 * Initialize Express server
 * =============================================================================
 */
const app = express();

/**
 * =============================================================================
 * Initialize body parser
 * =============================================================================
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * =============================================================================
 * CORS Handling
 * =============================================================================
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT"
  );
  next();
});

/**
 * =============================================================================
 * Routes handling
 * =============================================================================
 */

// Root Page
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to Ambition" });
});

// // Routes
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/classes", require("./routes/classRoutes"));
// // app.use("/api/classes", require("./routes/lessonRoutes"));

// // instructor routes
// app.use("/api/instructors", require("./routes/instructorRoutes"));

// // Guardian routes
// app.use("/api/guardians", require("./routes/guardianRoutes"));

// // student routes
// app.use("/api/students", require("./routes/studentRoutes"));

// // student routes
// app.use("/api/utilities", require("./routes/utilityRoutes"));

/**
 * =============================================================================
 * Final stage Error Middleware Handling
 * =============================================================================
 */
// app.use(errorHandler);
//
/**
 * =============================================================================
 * Listen to port and run server
 * =============================================================================
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
