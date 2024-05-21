const bcrypt=  require('bcrypt');
const fsPromises = require('fs').promises;
const path = require('path')

// const User = require('../database/Users')
// const mongoose = require('mongoose')

const {format} = require('date-fns')

const usersDB ={
    users : require('../database/users.json'),
    setUsers : function (data) {this.users = data} 
}

const registerHandler = async (req, res) => {
    const {user, pwd} = req.body
    if(!user || !pwd) return res.status(404).json({"error" : "user and pwd are required!"})

    // const dup = await User.findOne({username : user}).exec()
    // if(dup) return res.status(409).json({"error" : "user already exist"})

    const foundUser = usersDB.users.find(person => person.username === user)
    if(foundUser) return res.status(409).json({"error" : "user already exist"})


    const date = format(new Date, 'yyyyMMdd')

    try{
        const hashedPwd = await bcrypt.hash(pwd, 10)

        // const result = await User.create({
        //     "username": user,
        //     "created": date,
        //     "roles": { "role": "STUDENT" }, // Nested object for roles
        //     "pwd": hashedPwd,
        //     "userScore": 0,
        //     "accessToken": "",
        //     "refreshToken": ""
        // });

        // console.log(result)
        // res.status(200).json({"success" : `${user} is created`})


        const newUser = {
            "username" : user, 
            "created" : date,
            "roles" : {"role" : 'STUDENT'},
            "pwd" : hashedPwd,
            "userScore" : 0
        }
        usersDB.setUsers([...usersDB.users, newUser])

        await fsPromises.writeFile(path.join(__dirname,'..','database','users.json'), JSON.stringify(usersDB.users))
        res.status(200).json({"success" : `${user} is created`})
    }catch(err) {
        return res.sendStatus(500)
    }
}

module.exports = {registerHandler}