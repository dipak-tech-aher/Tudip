const mongoose = require('mongoose');
const candidateSchema = mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    address: String,
});

module.exports = mongoose.model('candidates', candidateSchema);