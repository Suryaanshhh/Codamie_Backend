const User = require("../Model/user")
const user = require("../Model/user")
const bcrypt = require("bcrypt")
const saltRound = 10


const signUp = async function (req, res) {
    try {
        const name = req.body.userName
        const email = req.body.userEmail
        const pass = req.body.userPassword

        const existedUser = await User.findOne({ where: { Email: email } })

        if (existedUser) {
           return res.json({ message: "User Already Exist" })
        }

        await bcrypt.hash(pass, saltRound, async (err, hash) => {
            await user.create({
                Name: name,
                Email: email,
                Password: hash
            })
            return res.status(201).json({ message: "User Registered" })
        })
    } catch (error) {
      return  res.status(500).json({ message: "Something went wrong" })
    }

}




module.exports = signUp