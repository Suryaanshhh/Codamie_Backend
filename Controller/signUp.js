const User = require("../Model/user")
const user = require("../Model/user")
const bcrypt = require("bcrypt")
const saltRound = 10


const signUp = async function (req, res) {
    try {
        const name = req.body.name
        const email = req.body.email
        const pass = req.body.password

        const existedUser = await User.findOne({ where: { Email: email } })

        if (existedUser) {
            res.json({ message: "User Already Exist" })
        }

        await bcrypt.hash(pass, saltRound, async (err, hash) => {
            await user.create({
                Name: name,
                Email: email,
                pass: hash
            })
        })

        res.status(201).json({ message: "User Registered" })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }

}