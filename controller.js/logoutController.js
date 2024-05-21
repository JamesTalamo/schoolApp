const fsPromises = require('fs').promises
const path = require('path')

const usersDB = {
    users : require('../database/users.json'),
    setUsers : function (data) {this.users = data}
}


const logoutHandler = async (req, res) => {

    const jwtCookies = req.cookies.jwtAccessToken
    if (!jwtCookies) return res.sendStatus(400)

    const foundUser = usersDB.users.find(person => person.accessToken )
    // const foundUser = await Users.findOne({ accessToken: jwtCookies });
    if (!foundUser) {
        setTimeout(() => {
            res.clearCookie('jwtAccessToken', { httpOnly: true, maxAge: 6 * 24 * 24 * 1000 })
            res.clearCookie('jwtRefreshToken', { httpOnly: true, maxAge: 6 * 24 * 24 * 1000 })
            res.status(200).send('OK')
            return
        }, 1000)
    }

    if (foundUser) {
        const otherUsers = usersDB.users.filter(person => person.accessToken !== jwtCookies )
        const currentUser = {...foundUser,accessToken : '', refreshToken : ''}
        usersDB.setUsers([...otherUsers, currentUser])

        await fsPromises.writeFile(path.join(__dirname,'..','database','users.json'),JSON.stringify(usersDB.users))

        // foundUser.accessToken = '';
        // foundUser.refreshToken = '';
        // const result = await foundUser.save();
        // console.log(result)

        setTimeout(() => {
            res.clearCookie('jwtAccessToken', { httpOnly: true, maxAge: 6 * 24 * 24 * 1000 })
            res.clearCookie('jwtRefreshToken', { httpOnly: true, maxAge: 6 * 24 * 24 * 1000 })
            res.status(200).send('OK')
            return
        }, 1000)
    }

}

module.exports = { logoutHandler }