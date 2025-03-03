const mongoose = require('mongoose');

const db = mongoose.connect('mongodb+srv://ukbhesaniya01:PiRcsU7u7FFISKRu@todocluster.m7llv.mongodb.net/purple-free-panel').then(() => {
    
    console.log('Database Connected.');
}).catch((err) => {
    
    console.log('Database Not Connect', err);
});

module.exports = db;