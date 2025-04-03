const profile = require("../Model/userProfile");
const userProfile = require("../Model/userProfile")

const findProfiles = async (req, res) => {
    try {
        let data = await userProfile.findAll();
        res.status(200).json({ profile: data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ meassage: "Something went wrong" })
    }
}

module.exports=findProfiles