const User = require("../Model/user.js")
const bcrypt = require("bcrypt")
const { use } = require("../Routes/userRoutes")

const login = async (req, res) => {
    const mail = req.body.userEmail
    const pass = req.body.userPassword

    const user = await User.findOne({ where: { Email: mail } });

    if (user) {
        bcrypt.compare(pass, user.dataValues.Password, async function (err, result) {
            if (result == true) { return res.status(201).json({ message: "User Logged in ." }) }
            else {
                return res.status(500).json({ message: "Incorrect Password" })
            }
        })
    }
    else {
        res.status(404).json({ message: "User Not Found" })
    }

}

module.exports = login