const express = require('express');
const app = express();
const StudentRoute = require('./api/routes/student');
const FacultyRouter = require('./api/routes/faculty');
const req = require('express/lib/request');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');

mongoose.connect('mongodb+srv://abhijeet:ABHI1234@restapi.igrwz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

mongoose.connection.on('error', err => {
    console.log("Connection Failed Bro....");
});

mongoose.connection.on('connected', connected => {
    console.log("Your project connected to MongoDB Atlas Successfully...");
});


// app.use(BodyParser.urlencoded({ extended: false }));
// app.use(BodyParser.json);

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());


// Yaad Rakho 'body-parser' ko apne saare routes k phale likhna hai
// aur connection k code k baad mein

app.use('/student', StudentRoute)

app.use('/faculty', FacultyRouter)



// ERROR HANDLING FOR BACKEND 

app.use((req, res, next) => {
    res.status(404).json({
        error: "BAD REQUEST"
    })
})

module.exports = app;