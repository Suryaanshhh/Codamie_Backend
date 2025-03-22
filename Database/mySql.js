const {Sequelize}=require("sequelize");

  const sequelize=new Sequelize("codamie","root","suryansh@123",{
    host:"localhost",
    dialect:"mysql",
    logging: console.log, 
})

module.exports=sequelize
