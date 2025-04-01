const { DataTypes } = require("sequelize");
const sequelize = require('../Database/mySql.js')

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  githubID: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = User;