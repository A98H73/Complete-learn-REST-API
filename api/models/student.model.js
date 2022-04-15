// Sabse phale humne mongoose ko use kiya taki schema create kar sake

const mongoose = require('mongoose');

// Aab kyuki hume data ko store krna hai to uska structure define karna hoga
// Kese Define Karenege
// Simple ek NAYA SCHEMA BANA KAR

const studSchema = new mongoose.Schema({

    // "_id" bas ek unique id dene k liye hai
    // user isse input ni dega database itself
    // ye provide karega

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    phone: Number,
    gender: String,
})


// Aab isko export kar denge
// 2 arg hai isme (schema_name, Scheme_variable_name)

module.exports = mongoose.model('Student', studSchema);
