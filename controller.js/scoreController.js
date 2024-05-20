const fsPromises = require('fs').promises
const path = require('path')

const usersDB = {
    users: require('../database/users.json'),
    setUsers: function (data) { this.users = data }
}

const setUserScore = async (req, res) => {
    const cookies = req.cookies.jwtAccessToken
    const exist = usersDB.users.find(person => person.accessToken === cookies)
    if (exist) console.log(exist.userScore += 1)

    usersDB.setUsers(usersDB.users)
    await fsPromises.writeFile(path.join(__dirname, '..', 'database', 'users.json'), JSON.stringify(usersDB.users))

    res.status(200).json({ "success": "success!" })

}

const allScoreToZero = async (req, res) => {
    usersDB.users.forEach(person => {
        if(person.roles.role === 'TEACHER') return

        if (person.userScore !== 0) {
            person.userScore = 0;
        }
    });


    usersDB.setUsers(usersDB.users);

    await fsPromises.writeFile(path.join(__dirname, '..', 'database', 'users.json'), JSON.stringify(usersDB.users))

    res.status(200).json({ "success": "success!" });
};


module.exports = 
{
    setUserScore,
    allScoreToZero
}