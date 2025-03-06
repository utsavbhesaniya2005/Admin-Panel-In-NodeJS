const userModel = require("../models/userModel");
const blogModel = require('../models/blogModel');
const bcrypt = require('bcrypt');
const fs = require('fs');

const home = async (req, res) => {

    let { uId } = req.cookies;

    let user = await userModel.findOne({_id : uId});    

    res.render('index', { user });
}

const signIn = (req, res) => {

    res.render('signIn');
}

const signUp = (req, res) => {

    res.render('signUp');
}

const register = async (req, res) => {

    try{

        let { username, email, password, avatar, dob, pno, role, country, city, zipcode } = req.body;

        bcrypt.hash(password, 12, async (err, hashPass) => {

            if(!err){

                let user = await new userModel({
                    username,
                    email,
                    password : hashPass,
                    avatar,
                    dob,
                    pno,
                    role,
                    country,
                    city,
                    zipcode
                });
                await user.save();
            }
        });

        console.log('User Registerd');
        
        res.redirect('signIn');

    }catch(err){

        console.log("Register User Error >>:- ", err);
    }
}

const userLogin = async (req, res) => {

    try{

        let { email, password } = req.body;

        let user = await userModel.find({ email });

        if(user.length > 0){

            bcrypt.compare(password, user[0].password, (err, pass) => {

                if(!err && pass){
                    
                    console.log('User Registered.');
                    res.cookie('uId', user[0]._id, { maxAge : 1000 * 3600, expires : true, httpOnly : true });
                    res.redirect('/');
                }
            });
        }else{

            console.log('User Not Registerd.');
            res.redirect('/signUp');
        }

    }catch(err){

        console.log('Login User Error >>', err);
    }
}

const myProfile = async (req, res) => {

    let { uId } = req.cookies;

    let user = await userModel.findOne({_id : uId});

    let blogs = await blogModel.find({authorId : uId});

    res.render('profile', {user, blogs});
}

const addAvatar = async (req, res) => {

    let prevAvatar = await userModel.findById(req.params.id);

    fs.unlink(prevAvatar.avatar, (err) => {

        console.log('Profile Image Replaced.');
    });

    let { path } = req.file;

    await userModel.findByIdAndUpdate(req.params.id, {
        avatar : path
    });

    console.log('Profile Image Added.');
    
    res.redirect('/myProfile');
}

const editInfo = async (req, res) => {

    let { uId } = req.cookies;

    let user = await userModel.findOne({_id : uId});

    res.render('editInfo', {user});
}

const editAddress = async (req, res) =>{

    let { uId } = req.cookies;

    let user = await userModel.findOne({_id : uId});

    res.render('editAddress', {user});
}

const updateInfo = async (req, res) => {

    await userModel.findByIdAndUpdate(req.params.id, req.body);

    console.log('User Personal Info Updated.');
    
    res.redirect('/myProfile');
} 

const updateAdd = async (req, res) => {

    await userModel.findByIdAndUpdate(req.params.id, req.body);

    console.log('User Address Info Updated.');
    
    res.redirect('/myProfile');
}

const signOut = (req, res) => {

    res.clearCookie('uId');
    res.redirect('/signIn');
}


// Blogs Controller

const addBlog = async (req, res) => {

    let { uId } = req.cookies;

    let user = await userModel.findOne({_id : uId});

    res.render('addBlog', {user});
}

const saveBlogs = async (req, res) => {

    try{

        const { title, blogImage, blog } = req.body;

        const { path } = req.file;

        let newBlog = await new blogModel({
            title,
            blogImage : path,
            blog,
            authorId : req.cookies.uId,
        });

        await newBlog.save();

        console.log('Blog Added.');

        res.redirect('/');
    }catch(err){

        console.log('Adding Blog Error: >>', err);
    }
}

const allBlogs = async (req, res) => {

    let { uId } = req.cookies;

    let user = await userModel.findOne({_id : uId});
    
    let blogs = await blogModel.find({});

    res.render('allBlogs', {user, blogs});
}

module.exports = {
    home,
    signIn,
    signUp,
    register,
    userLogin,
    myProfile,
    addAvatar,
    editInfo,
    editAddress,
    updateInfo,
    updateAdd,
    signOut,
    addBlog,
    saveBlogs,
    allBlogs,
}