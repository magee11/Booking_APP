const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        res.send("Token is required")
    }
    jwt.verify(token,process.env.JWT_TOKEN,(err, data) => {
        if(err){
            res.send("Token is not valid")
        }
        req.user = data
        next()
    })
}

module.exports = verify