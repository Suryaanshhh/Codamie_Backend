const express = require("express");
const passport = require("../Controller/githubAuth");
const User = require("../Model/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
router.options("*", (_, res) => res.sendStatus(200));
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));


router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    async (req, res) => {
      try {
        const { id, displayName } = req.user;
        let user = await User.findOne({ where: { githubID: id } });
  
        if (!user) {
          user = await User.create({
            Name: displayName,
            githubID: id
          });
        }
  
        const token = jwt.sign({ userID: user.dataValues.id }, "abra ka dabra");
  
        // Redirect only if from browser
        const redirectURL = user.isNewRecord
          ? `http://localhost:5173/createProfile?token=${token}`
          : `http://localhost:5173/home?token=${token}`;
  
        return res.redirect(redirectURL);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "something went wrong" });
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