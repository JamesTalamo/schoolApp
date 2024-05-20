const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    created : {
        type : String,
        required : true
    },
    roles: {
        type: {
            role: {
                type: String,
                default: 'STUDENT'
            }
        },
        required: true,
        _id: false // Specify that _id should not be generated for the roles subdocument
    },
    pwd : {
        type : String,
        required : true
    },
    userScore : {
        type : Number
    },
    accessToken : {
        type : String
    },
    refreshToken : {
        type : String
    }
}, { versionKey: false }); // Prevents Mongoose from adding the __v field

module.exports = mongoose.model('User', userSchema);
