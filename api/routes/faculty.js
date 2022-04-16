const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Faculty = require('../models/faculty.model');

router.get('/', (req, res, next) => {

    Faculty.find()
        .then(result => {
            console.log(result),
                res.status(200).json({
                    FacultyValue: result,
                })
        })

        .catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err,
                })
        })

})


router.post('/', (req, res, next) => {

    const fac = new Faculty({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        type: req.body.type,
        phone: req.body.phone,
        gender: req.body.gender,
    })

    fac.save()
        .then(result => {
            console.log(result),
                res.status(200).json({
                    newfaculty: result
                })
        })

        .catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err,
                })
        })

})

module.exports = router;