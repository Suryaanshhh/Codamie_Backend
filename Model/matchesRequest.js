const {DataTypes}=require("sequelize");
const sequelize = require('../Database/mySql.js')

const matchesRequest=sequelize.define("MatchRequest",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        autoIncrement:true,
        primaryKey:true
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