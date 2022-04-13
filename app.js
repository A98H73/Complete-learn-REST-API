const express = require('express');
const app = express();
const StudentRoute = require('./api/routes/student');
const FacultyRouter = require('./api/routes/faculty')


app.use('/student', StudentRoute)

app.use('/faculty', FacultyRouter)

app.use((req, res, next) => {
    res.status(200).json({
        message: 'humara app is running bhai'
    })
})

module.exports = app;