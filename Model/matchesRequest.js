const {DataTypes}=require("sequelize");
const sequelize = require('../Database/mySql.js')

const matchesRequest=sequelize.define("Request",{
    id:{
        allowNull:false,
        unique:true,
        autoIncrement:true
    },
    personId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
    }
})

module.exports = matchesRequest