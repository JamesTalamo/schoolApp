const jwt = require('jsonwebtoken')
require('dotenv').config()

const usersDB = {
    users: require('../database/users.json')
}

const verifyJWT = (req,res, next) => {
    const verifyCookie = req.cookies
    if(!verifyCookie?.jwtAccessToken) return res.sendStatus(408)
    const token = verifyCookie.jwtAccessToken

    const accessToken = usersDB.users.find(person => person.accessToken === token)
    if(!accessToken) res. sendStatus(407)

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(405)

            req.user = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            next()
        }
    )
}

module.exports = verifyJWT