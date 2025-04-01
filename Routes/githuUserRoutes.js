const express = require("express");
const passport = require("../Controller/githubAuth");

const router = express.Router();

// GitHub Auth Route
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// GitHub Callback Route
router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
        res.status(200).json({ message: "User Logged in" }); // Redirect after successful login
    }
);


router.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) return res.redirect("/");
    res.json({ user: req.user });
});

// Logout Route
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

module.exports = router;