module.exports = (sequelize, Sequelize) => {
  const Milestone = sequelize.define("milestone", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "title is required" },
      },
    },
    description: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['Ongoing', 'Done'],
      defaultValue: 'Ongoing',
      allowNull: false,
      validate: {
        notNull: { msg: "phase is required" },
      },
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

   /**
   * =============================================================================
   * ASSOCIATIONS
   * =============================================================================
   */

   Milestone.associate = models => {
    Milestone.belongsTo(models.MajorGoal, {
      foreignKey: {
        allowNull: false
      }
    });
  };


  /**
   * =============================================================================
   * CLASS METHODS
   * =============================================================================
   */

  // Create milestone
  Milestone.create = async function(req, res) {
    const {title, description} = req.body;

    // const user = await User.findById(req.user.id);

    // if (!user) {
    //   res.status(400);
    //   throw new Error("No user found");
    // }

    // Validations
    if (!title) {
      res.status(400).send({
        message: "Please include required fields!"
      });
      return;
    };

    // create new milestone
    let newMilestone;
    try {
      newMilestone = await Milestone.build({
        title,
        description,
        status,
        isActive,
      });
    } catch (error) {
      res.status(400).send({
        message: "Cant create majorGoal!"
      });
    }

    // Add milestone to db
    try {
      await newMilestone.save();
    } catch (error) {
      res.status(400).send({
        message: "fail to save majorGoal!"
      });
    }

    if (newMilestone) {
      res.status(201).json({
        _id: newMilestone._id,
        title: newMilestone.title,
        description: newMilestone.description,
        status: newMilestone.status,
        isActive: newMilestone.isActive
      });
    } else {
      res.status(400).send({
        message: "Invalid class data!"
      });
    }

  };

  return Milestone;
};
