const express = require("express");
const passport = require("../Controller/githubAuth");
const User = require("../Model/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));


router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    async (req, res) => {
        try {
            const { id, displayName } = req.user
            console.log(id, displayName)
            let user = await User.findOne({ where: { githubID: id } })

            if (!user) {
                let newUser = await User.create({
                    Name: displayName,
                    githubID: id
                })
                const token = await jwt.sign({ userID: newUser.dataValues.id }, "abra ka dabra")
                
                res.redirect(`http://localhost:5173/userProfile?token=${token}`);
            }

            else {
                const token = await jwt.sign({ userID: user.dataValues.id }, "abra ka dabra")
                res.status(200).json({ token, message: "User Logged in" });
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ message: "somthing went wrong" })
        }

    }
);


// router.get("/profile", (req, res) => {
//     if (!req.isAuthenticated()) return res.redirect("/");
//     res.json({ user: req.user });
// });

// Logout Route
// router.get("/logout", (req, res) => {
//     req.logout(() => {
//         res.redirect("/");
//     });
// });

module.exports = router;