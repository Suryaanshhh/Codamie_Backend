const User = require("../Model/user")
const matchesRequest = require("../Model/matchesRequest");

const matchRequestCreate = async (req, res) => {
    try {
        const uID = req.body.id
        await matchesRequest.create({
            personId: uID,
            state: "Pending"
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

module.exports={
matchRequestCreate,matchRequestAccept,matchRequestReject
}