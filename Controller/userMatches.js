const matchesRequest = require("../Model/matchesRequest.js");
const { Op } = require('sequelize');
const userMatches = require("../Model/matches.js")
const { jwtDecode } = require("jwt-decode")

const addMatch = async (req, res) => {
    try {
        await userMatches.create({
            User1: req.user.id,
            User2: req.body.UserId,
            User1Name: req.user.Name,
            User2Name: req.body.Name
        })
        await matchesRequest.update(
            { state: "Accepted" },
            {
                where: {
                    personId: req.user.id,
                    UserId: req.body.UserId
                }
            }
        )

        res.status(201).json({ message: "match added !!" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

const removeMatch = async (req, res) => {
    try {
        await matchesRequest.destroy({
            where: {
                personId: req.body.personId
            }
        })
        res.status(200).json({ message: "match deleted !!" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

const matchList = async (req, res) => {
    const token = req.header("Authorization")
    const decodedToken = jwtDecode(token)
    console.log(decodedToken)
    try {
        userMatches.findAll({
            where: {
                [Op.or]: [
                    { User1: decodedToken.userID },
                    { User2: decodedToken.userID }
                ]
            }
        })
            .then((matches) => {
                res.status(200).json({ matches });
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong", err })
    }
}



module.exports = { addMatch, removeMatch, matchList }