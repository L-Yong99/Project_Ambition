module.exports = (sequelize, Sequelize) => {
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");

  const MajorGoal = sequelize.define("majorGoal", {
    header: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    right_header: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    right_value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phase: {
      type: Sequelize.STRING,
      defaultValue: "In progress",
      allowNull: false,
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
  };

  return MajorGoal;
};
