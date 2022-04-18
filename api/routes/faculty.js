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

//  GET data by ID

router.get('/:idfy', (req, res, next) => {
    console.log(req.params.idfy);
    Faculty.findById(req.params.idfy)
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg: "Find Successfully!!...",
                Flty_data: result,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: "Something went wrong...",
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


// Delete Faculty Data

router.delete('/:idfy', (req, res, next) => {

    Faculty.remove({ _id: req.params.idfy })
        .then(result => {
            console.log(result),
                res.status(200).json({
                    msg: "Faculty Data Deleted Successfully",
                    fltyData: result,
                })

        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: "Something went wrong!...",
                error: err,
            })
        })

})

//  PUT Request

router.put('/:idfy', (req, res, next) => {
    console.log(req.params.idfy);
    Faculty.findOneAndUpdate({ _id: req.params.idfy }, {
        name: req.body.name,
        type: req.body.type,
        phone: req.body.phone,
        gender: req.body.gender,
    })

        .then(result => {
            console.log(result);
            res.status(200).json({
                msg: "Updated Successfully Bhaiya ji",
                flty_data_update: result,
            })
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: "Something went wrong, try after some time",
                error: err,
            })
        })
})


module.exports = router;