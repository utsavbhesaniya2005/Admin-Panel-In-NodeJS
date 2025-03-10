const express = require('express');
const route = express.Router();
const panelController = require('../controllers/panelController');
const authMiddleware = require('../middlewares/auth');
const uploads = require('../middlewares/multer');

// Home Page Render
route.get('/', authMiddleware.auth, panelController.home);

// SignIn Page Render
route.get('/signIn', authMiddleware.loginMiddleware, panelController.signIn);

// SignUp Page Render
route.get('/signUp', panelController.signUp);

// Get Register User
route.post('/register', panelController.register);

// Login User
route.post('/userLogin', panelController.userLogin);

// SignOut User
route.get('/signOut', panelController.signOut);

// Profile Page Render
route.get('/myProfile', authMiddleware.auth, panelController.myProfile);

// Edit Personal Info
route.get('/editInfo/:id', authMiddleware.auth, panelController.editInfo);

// Edit Address Info
route.get('/editAddress/:id', authMiddleware.auth, panelController.editAddress);

// Avatar Adding
route.post('/addAvatar/:id', uploads.single('avatar'), panelController.addAvatar);

// Update Personal Info
route.post('/updateInfo/:id', panelController.updateInfo);

// Update Address Info
route.post('/updateAdd/:id', panelController.updateAdd);



// Blog Routes

// Add Blog Page Render
route.get('/addBlog', authMiddleware.auth, panelController.addBlog);

// Blog Add 
route.post('/addBlogs', uploads.single('blogImage'), panelController.saveBlogs);

// Show All Blogs
route.get('/allBlogs', authMiddleware.auth, panelController.allBlogs);

module.exports = route;