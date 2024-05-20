const User = require('../database/Users')

const getUsers = async (req ,res) => {
    try{

        const users = await User.find()
        res.send(users)

    }catch(err){
        console.error(err)
    }
}

module.exports = {getUsers}