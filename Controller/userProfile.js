const User = require("../Model/user");
const userProfile = require("../Model/userProfile");

const profileCreation = async (req, res, next) => {
    try {
        const emoji = req.body.Avatar
        const codingExperience = req.body.CodingExperience
        const CodingLanguage = req.body.CodingLanguage
        const int = req.body.Interest
        const about = req.body.Biodata
        const gender=req.body.Gender

        await userProfile.create({
            Avatar: emoji,
            CodingExperience: codingExperience,
            CodingLanguage: CodingLanguage,
            Interest: int[0],
            Biodata: about,
            UserId: req.user.id,
            Gender:gender
        })
        res.status(201).json({ message: "profileCreated" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }
}




module.exports = profileCreation

// const profile = {
//     Avatar: selectedEmoji,
//     CodingExperience: exp,
//     CodingLanguage: lang,
//     Interest: interest,
//     Biodata: about
// }