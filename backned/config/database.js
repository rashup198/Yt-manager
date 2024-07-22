const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
 mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }).then(() => {
    console.log('Successfully connected to the database');
 }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}
