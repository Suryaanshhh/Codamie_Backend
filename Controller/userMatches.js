const matchesRequest = require("../Model/matchesRequest.js");

const userMatches = require("../Model/matches.js")

const addMatch = async (req, res) => {
    try {
        await userMatches.create({
            Name: req.body.name,
            userId: req.user.id
        })
        res.status(201).json({ message: "match added !!" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

const removeMatch=async(req,res)=>{
    try{
        await matchesRequest.destroy({
            where :{
                personId:req.body.personId
            }
        })
        res.status(200).json({ message: "match deleted !!" })
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports={addMatch,removeMatch}