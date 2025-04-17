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
            const { id, displayName } = req.user;
            let user = await User.findOne({ where: { githubID: id } });
            let token;

            if (!user) {
                let newUser = await User.create({
                    Name: displayName,
                    githubID: id
                });
                token = await jwt.sign({ userID: newUser.dataValues.id }, "abra ka dabra");
                // Send HTML with auto-redirect instead of direct redirect
                return res.send(`
                    <html>
                        <head>
                            <script>
                                window.location.href = 'http://localhost:5173/createProfile?token=${token}';
                            </script>
                        </head>
                        <body>
                            <p>Redirecting to application...</p>
                        </body>
                    </html>
                `);
            } else {
                token = await jwt.sign({ userID: user.dataValues.id }, "abra ka dabra");
                // Send HTML with auto-redirect instead of direct redirect
                return res.send(`
                    <html>
                        <head>
                            <script>
                                window.location.href = 'http://localhost:5173/home?token=${token}';
                            </script>
                        </head>
                        <body>
                            <p>Redirecting to application...</p>
                        </body>
                    </html>
                `);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "something went wrong" });
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