const mongoose = require('mongoose');
// Connecting to the database
const connectWithDb = () => {
    mongoose
        .connect('mongodb+srv://dipak:Helloworld12345@cluster0.tir1zpp.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Successfully connected to the database");
        }).catch(error => {
            console.log('Could not connect to the database. Exiting now...', error);
            process.exit(1);
        });
};

module.exports = connectWithDb;