const { DataTypes } = require("sequelize");
const sequelize = require("../Database/mySql");

const profile = sequelize.define("Profile", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    Name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Gender:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CodingExperience: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CodingLanguage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Interest: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Biodata: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
module.exports=profile