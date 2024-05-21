// const User = require('../database/Users')

const usersDB ={
    users : require('../database/users.json'),
    setUsers : function (data) {this.users = data} 
}


const getUsers = async (req ,res) => {
    try{
        res.send(usersDB.users)

    }catch(err){
        console.error(err)
    }
}

module.exports = {getUsers}