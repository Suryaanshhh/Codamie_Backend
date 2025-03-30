const User = require("../Model/user");
const userProfile = require("../Model/userProfile");

const profileCreation = async (req, res, next) => {
    try {
        const emoji = req.body.Avatar
        const codingExperience = req.body.CodingExperience
        const codingLanguage = req.body.codingLanguage
        const int = req.body.Interest
        const about = req.body.Biodata

        await userProfile.create({
            Avatar: emoji,
            CodingExperience: codingExperience,
            CodingLanguage: codingLanguage,
            Interest: int,
            Biodata: about
        })

    }
    catch(err){
        
    }
}

// const profile = {
//     Avatar: selectedEmoji,
//     CodingExperience: exp,
//     CodingLanguage: lang,
//     Interest: interest,
//     Biodata: about
// }