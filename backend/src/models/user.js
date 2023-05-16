module.exports = (sequelize, Sequelize) => {
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");

  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING(30),
      allowNull: false,
    }
  });

  /**
   * =============================================================================
   * ASSOCIATIONS
   * =============================================================================
   */

  /**
   * onDelete cascade will delete all related association when
     parents is deleted
   */

  User.associate = models => {
    User.hasMany(models.MajorGoal, {
      onDelete: "cascade"
    });
  };

  /**
   * =============================================================================
   * CLASS METHODS
   * =============================================================================
   */

  // Sign Up function
  User.signUp = async function(req, res) {
    const {email, password, first_name} = req.body;

    // Validations
    if (!email || !password || !first_name ) {
      res.status(400).send({
        message: "Please include all fields!"
      });
      return;
    }

    // Check if user already exists
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      console.log("User already exist!");
      res.status(500).send({
        message: "User already exists!"
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create User
    const user = await User.create({
      email,
      password: hashedPassword,
      first_name,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        first_name: user.first_name,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).send({
        message: "Invalid user data!"
      });
    }
  };

  // Login function
  User.login = async function(req, res) {
    const { email, password } = req.body;

    console.log("Login in");

    // Validation
    if (!email || !password) {
      res.status(400).send({
        message: "Please include all fields!"
      });
      return;
    }

    // Find if user already exists
    const user = await User.findOne({ where: { email: email } });

    console.log(user);

    if (!user) {
      res.status(400).send({
        message: "No such user. Please create an account"
      });
      return;
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (passwordIsValid) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        first_name: user.first_name,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send({
        message: "Incorrect credentials. Try again"
      });
      return;
    }
  };

  /**
   * =============================================================================
   * INSTANCE METHOD
   * =============================================================================
   */

  // Model.prototype.myCustomSetter = function (param, param2) {  }

  // Generate Token
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };

  return User;
};
