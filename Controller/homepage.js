const profile = require("../Model/userProfile");
const userProfile = require("../Model/userProfile");
const { Op } = require('sequelize');

const findProfiles = async (req, res) => {
    try {
        let data = await userProfile.findAll({where:{
            userId:{
                [Op.ne]:req.user.id
            }
        }});
        res.status(200).json({ profile: data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ meassage: "Something went wrong" })
    }
}

module.exports=findProfiles