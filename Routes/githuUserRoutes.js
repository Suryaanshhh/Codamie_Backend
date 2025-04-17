const express = require("express");
const passport = require("../Controller/githubAuth");
const User = require("../Model/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));


router.get(
    "/github/callback",
    (req, res, next) => {
        // Handle the authentication without redirect
        passport.authenticate("github", (err, user, info) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Authentication error");
            }
            
            if (!user) {
                return res.redirect("/"); // Failure case
            }
            
            req.login(user, async (err) => {
                if (err) return next(err);
                
                try {
                    const { id, displayName } = user;
                    let dbUser = await User.findOne({ where: { githubID: id } });
                    let token;
                    let redirectPath;

                    if (!dbUser) {
                        let newUser = await User.create({
                            Name: displayName,
                            githubID: id
                        });
                        token = jwt.sign({ userID: newUser.dataValues.id }, "abra ka dabra");
                        redirectPath = "createProfile";
                    } else {
                        token = jwt.sign({ userID: dbUser.dataValues.id }, "abra ka dabra");
                        redirectPath = "home";
                    }

                    // Return an HTML page that will handle the redirect client-side
                    res.send(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <title>Authentication Successful</title>
                        </head>
                        <body>
                            <p>Authentication successful. Redirecting...</p>
                            <script>
                                // Store token in localStorage
                                localStorage.setItem('auth_token', '${token}');
                                
                                // Redirect to the appropriate page
                                window.location.href = 'http://localhost:5173/${redirectPath}';
                            </script>
                        </body>
                        </html>
                    `);
                } catch (err) {
                    console.error(err);
                    res.status(500).send("Something went wrong");
                }
            });
        })(req, res, next);
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