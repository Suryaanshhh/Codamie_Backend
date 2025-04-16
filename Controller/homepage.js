const profile = require("../Model/userProfile");
const userProfile = require("../Model/userProfile");
const { Op,Sequelize } = require('sequelize');

const findProfiles = async (req, res) => {
    try {
        let data = await userProfile.findAll({
            where: {
                userId: {
                    [Op.ne]: req.user.id,
                    [Op.notIn]: Sequelize.literal(`(
                        SELECT 
                            CASE 
                                WHEN User1 = ${req.user.id} THEN User2 
                                ELSE User1 
                            END 
                        FROM userMatches 
                        WHERE User1 = ${req.user.id} OR User2 = ${req.user.id}
                    )`)
                }
            }
        });
        res.status(200).json({ profile: data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ meassage: "Something went wrong" })
    }
}

module.exports=findProfiles