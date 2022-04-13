const express = require('express');
const app = express();
const StudentRoute = require('./api/routes/student');
const FacultyRouter = require('./api/routes/faculty');
const req = require('express/lib/request');


app.use('/student', StudentRoute)

app.use('/faculty', FacultyRouter)



// ERROR HANDLING FOR BACKEND 

app.use((req, res, next) => {
    res.status(404).json({
        error: "BAD REQUEST"
    })
})

module.exports = app;