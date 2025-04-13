const User = require("../Model/user.js")
const bcrypt = require("bcrypt")
const userProfile=require("../Model/userProfile.js");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
    console.log(req.body)
    const mail = req.body.userEmail
    const pass = req.body.userPassword

    const user = await User.findOne({ where: { Email: mail } });

    if (user) {
        bcrypt.compare(pass, user.dataValues.Password, async function (err, result) {
            if (result == true) {
                const profile=await userProfile.findOne({where:{userId:user.dataValues.id}})
                if(profile){
                    const token = await jwt.sign({userID:user.dataValues.id,profile:true}, "abra ka dabra")
                    return res.status(200).json({jsonWebToken:token})
                }
                else{
                    const token = await jwt.sign({userID:user.dataValues.id,profile:false}, "abra ka dabra")
                    return res.status(200).json({jsonWebToken:token})
                }
            }
            else {
                return res.status(500).json({ message: "Incorrect Password" })
            }
        })
    }
    else {
        res.status(404).json({ message: "User Not Found" })
    }

}

module.exports = login