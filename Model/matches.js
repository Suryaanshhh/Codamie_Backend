const { DataTypes } = require("sequelize");
const sequelize = require("../Database/mySql");

const matches = sequelize.define("UserMatches", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    User1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    User2: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    User1Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    User2Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = matches