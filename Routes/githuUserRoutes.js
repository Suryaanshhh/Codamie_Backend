const express = require("express");
const passport = require("../Controller/githubAuth");
const User = require("../Model/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));



router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      const { id, displayName } = req.user;

      let user = await User.findOne({ where: { githubID: id } });

      let isNewUser = false;
      if (!user) {
        user = await User.create({
          Name: displayName,
          githubID: id
        });
        isNewUser = true;
      }

      const token = jwt.sign({ userID: user.dataValues.id }, "abra ka dabra");
      const redirectPath = isNewUser ? "createProfile" : "home";

      // IMPORTANT: Send a message back to the frontend opener window using postMessage
      res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Logging in...</title></head>
        <body>
          <script>
            window.opener.postMessage(
              {
                token: '${token}',
                redirectPath: '${redirectPath}'
              },
              'http://localhost:5173'  // Change this to your frontend domain in production
            );
            window.close();
          </script>
          <p>Authentication successful! You can close this window.</p>
        </body>
        </html>
      `);
    } catch (err) {
      console.error("GitHub callback error:", err);
      res.status(500).send("Something went wrong during authentication.");
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