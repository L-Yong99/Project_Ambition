module.exports = (sequelize, Sequelize) => {
  const MajorGoal = sequelize.define("majorGoal", {
    header: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "header is required" },
      },
      // This will require the header be present
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "title is required" },
      },
    },
    sub_header: {
      type: Sequelize.STRING,
    },
    sub_value: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['Ongoing', 'Completed'],
      defaultValue: 'Ongoing',
      allowNull: false,
      validate: {
        notNull: { msg: "phase is required" },
      },
    }
  });

   /**
   * =============================================================================
   * ASSOCIATIONS
   * =============================================================================
   */

   MajorGoal.associate = models => {
    MajorGoal.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    MajorGoal.hasMany(models.Milestone, {
      onDelete: "cascade"
    });
  };


  /**
   * =============================================================================
   * CLASS METHODS
   * =============================================================================
   */

  // Create goal
  MajorGoal.create = async function(req, res) {
    const {header, title, sub_header, sub_value, status} = req.body;

    // const user = await User.findById(req.user.id);

    // if (!user) {
    //   res.status(400);
    //   throw new Error("No user found");
    // }

    // Validations
    if (!header || !title ) {
      res.status(400).send({
        message: "Please include required fields!"
      });
      return;
    };

    // Create majorGoal

    // can use .build .save or
    // can use .create instead

    let newMajorGoal;
    try {
      newMajorGoal = await MajorGoal.build({
        header,
        title,
        sub_header,
        sub_value,
        status
      });
    } catch (error) {
      res.status(400).send({
        message: "Cant create majorGoal!"
      });
    }

    // Add major goal to db
    try {
      await newMajorGoal.save();
    } catch (error) {
      res.status(400).send({
        message: "fail to save majorGoal!"
      });
    }

    if (newMajorGoal) {
      res.status(201).json({
        _id: newMajorGoal._id,
        header: newMajorGoal.header,
        title: newMajorGoal.title,
        sub_header: newMajorGoal.sub_header,
        sub_value: newMajorGoal.sub_value,
        status: newMajorGoal.status
      });
    } else {
      res.status(400).send({
        message: "Invalid class data!"
      });
    }

  };

  return MajorGoal;
};
