const { DataTypes}=require("sequelize");
const sequelize=require("../Database/mySql");

const matches=sequelize.define("UserMatches",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
        allowNull:false,
        autoIncrement:true
    },
    Name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Icon:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports=matches