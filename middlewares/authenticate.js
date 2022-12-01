const asynchandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const User = require('../model/usermodel')


const protect = asynchandler(async (req, res, next) => {
    let token

    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            token = bearerToken;
            const decoded = jwt.verify(bearerToken, process.env.SECRET || '123456789')
            const user = await User.findOne({ email: decoded.email });


            if (user) {
                req.user = user;
                next()
            } else {
                res
                    .status(401)
                    .json(
                        {
                            status: "error",
                            message: "invalid request",
                            meta: {
                                error: 'user does not exist'
                            }
                        })
            }
        }
    } catch (e) {
        res.status(401)
        throw new Error('Not authorized, token failed')
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {
    protect
}