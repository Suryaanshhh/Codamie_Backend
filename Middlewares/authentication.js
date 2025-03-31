const jwt = require("jsonwebtoken")
const User = require("../Model/user")

 const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        const user = jwt.verify(token, "abra ka dabra")
        console.log(user)
        User.findOne({where:{id:user.userID}})
            .then((user) => {
                req.user = user;
                next();
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false });
    }
}
module.exports=auth
