// const fsPromises = require('fs').promises
// const path = require('path')

const Users = require('../database/Users')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const usersDB = {
    users: require('../database/users.json'),
    setUsers: function (data) { this.users = data }
}

const loginHandler = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ "error": "user and pwd are required!" })

    // const userFound = usersDB.users.find(person => person.username === user)
    // if (!userFound) return res.status(400).json({ "error": "username does not exist!" })

    const userFound = await Users.findOne({username : user}).exec();
    if (!userFound) return res.status(400).json({ "error": "username does not exist!" })

    try {
        const match = await bcrypt.compare(pwd, userFound.pwd)

        if (match) {

            const roles = Object.values(userFound.roles)
            // console.log(userFound.roles)



            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": userFound.username,
                        "roles" : roles
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            const refreshToken = jwt.sign(
                { "username": userFound.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            // const otherUsers = usersDB.users.filter(person => person.username !== userFound.username)
            // const currentUser = { ...userFound, accessToken, refreshToken }
            // usersDB.setUsers([...otherUsers, currentUser])

            // await fsPromises.writeFile(path.join(__dirname, '..', 'database', 'users.json'), JSON.stringify(usersDB.users))
            
            

            userFound.accessToken = accessToken
            userFound.refreshToken = refreshToken
            
            const result =await userFound.save()
            console.log(result)

            res.cookie('jwtAccessToken', accessToken, { httpOnly: true, maxAge: 6 * 24 * 24 * 1000 })
            res.cookie('jwtRefreshToken', refreshToken, { httpOnly: true, maxAge: 6 * 24 * 24 * 1000 })

            res.status(200).json({ accessToken })
        } else {
            res.status(400).json({"error" : "wrong password"})
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = { loginHandler }