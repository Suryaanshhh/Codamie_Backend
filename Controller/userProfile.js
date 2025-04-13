const User = require("../Model/user");
const userProfile = require("../Model/userProfile");

const profileCreation = async (req, res, next) => {
    const token = req.header("Authorization")
    try {
        const emoji = req.body.Avatar
        const age= req.body.Age
        const CodingLanguage = req.body.CodingLanguage
        const devType=req.body.Forte
        const about = req.body.Biodata
        const gender=req.body.Gender
        console.log(req.user.name)
        await userProfile.create({
            Avatar: emoji,
            Age:age,
            devType:devType,
            CodingLanguage: CodingLanguage,
            Biodata: about,
            UserId: req.user.id,
            Gender:gender,
            Name:req.user.Name
        })
        res.status(201).json({ message: "profileCreated",token})
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