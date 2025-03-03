const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    blogImage : {
        type : String,
        required : true,
    },
    blog : {
        type : String,
        required : true,
    },
    authorId : {
        type : String,
        required : true,
    },
    blogTime : {
        type : Date,
        required : true, 
        default : Date.now,
    },
});

const blogModel = mongoose.model('blogs', blogSchema);

module.exports = blogModel;