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
            let redirectPath;

            if (!user) {
                let newUser = await User.create({
                    Name: displayName,
                    githubID: id
                });
                token = await jwt.sign({ userID: newUser.dataValues.id }, "abra ka dabra");
                redirectPath = "createProfile";
            } else {
                token = await jwt.sign({ userID: user.dataValues.id }, "abra ka dabra");
                redirectPath = "home";
            }

            // Send an HTML page that uses postMessage to communicate with the parent window
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Authentication Complete</title>
                </head>
                <body>
                    <script>
                        // Send message to the parent window with token info
                        window.opener.postMessage(
                            { 
                                token: '${token}',
                                redirectPath: '${redirectPath}' 
                            }, 
                            'http://localhost:5173'
                        );
                        // Close this popup window
                        window.close();
                    </script>
                    <p>Authentication successful! You can close this window.</p>
                </body>
                </html>
            `);
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
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