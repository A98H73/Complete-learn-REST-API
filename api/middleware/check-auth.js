const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];
        const verification = jwt.verify(token, 'this is dummy text');
        console.log(token);
        console.log(verification);
        if (verification.userType = 'admin') {                                 // AGAR MULTIPLE USER HAI TO CHECK KAR LO
            next();
        }
        else {
            return res.status(401).json({
                msg: "You don't have the permission to access this request",
            })
        }

    }
    catch (error) {
        console.log("Invalid Token" + error);
        return res.status(401).json({
            msg: "Invalid Token",
            error: error,
        })
    }

}