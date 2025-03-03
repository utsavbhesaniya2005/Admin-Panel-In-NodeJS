const express = require('express');
const app = express();
const port = 3003;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes/panelRoutes');
const db = require('./db/dbConfig'); 

// Set View Engine
app.set('view engine', 'ejs');

// Static Folder
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

app.use('/', routes);

app.listen(port, (err) => {
    
    if(!err){
        console.log(`Server Running In http://localhost:${port}`);
    }
})