const mongoose = require('mongoose');

const facSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    type: String,
    phone: Number,
    gender: String
})


module.exports = mongoose.model('Faculty', facSchema);