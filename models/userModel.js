const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        default : null,
    },
    dob : {
        type : Date,
        default : null,
    },
    pno : {
        type : Number,
        default : null,
    },
    role : {
        type : String,
        default : null,
    },
    country : {
        type : String,
        default : null,
    },
    city : {
        type : String,
        default : null,
    },
    zipcode : {
        type : Number,
        default : null,
    }  
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;