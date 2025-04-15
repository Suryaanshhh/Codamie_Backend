const User = require("../Model/user")
const matchesRequest = require("../Model/matchesRequest");
const userProfile=require("../Model/userProfile")

const matchRequestCreate = async (req, res) => {
    try {
        await matchesRequest.create({
            personId: req.body.id,
            state: "Pending",
            UserId: req.user.id
        })
        res.status(201).json({ message: "request sent !" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong", err })
    }
}

const matchRequestAccept = async (req, res) => {
    try {
        const uID = req.body.id
        let matchedUser = await matchesRequest.findOne({ where: { personId: uID } })
        if (matchedUser) {
            await matchedUser.update({ state: "Accepted" })
        }
        res.status(201).json({ message: "request accepted !" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong", err })
    }
}


const matchRequestReject = async (req, res) => {
    try {
        const uID = req.body.id
        let matchedUser = await matchesRequest.findOne({ where: { personId: uID } })
        if (matchedUser) {
            matchedUser.update({ state: "Rejected" })
        }
        res.status(201).json({ message: "request rejected !" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong", err })
    }
}


const showMatches = async (req, res) => {
    const token = req.header("Authorization")
    try {
        const uId = req.user.id
        let allMatchesRequest = await matchesRequest.findAll({ where: {personId: uId ,state:"Pending"} })
        if(allMatchesRequest){
            let allMatches=await userProfile.findAll({where:{userId:allMatchesRequest[0].dataValues.UserId}})
            res.status(200).json({ allMatches ,token})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong", err })
    }
}





module.exports = {
    matchRequestCreate, matchRequestAccept, matchRequestReject, showMatches
}