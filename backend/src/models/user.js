module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    first_name: {
      type: Sequelize.BOOLEAN
    }
  });

  return User;
};
