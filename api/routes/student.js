const express = require('express');
const router = express.Router();

// Database ko use krna hai isliye mongoose require kiya


const mongoose = require('mongoose');
const Student = require('../models/student.model');   //const k baad 'Student' vo table ka naam hai, right vala uss model ka address


router.get('/', (req, res, next) => {

    Student.find()
        .then(result => {
            console.log(result);
            res.status(200).json({
                StuValue: result
            })
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            })
        })

})

router.get('/:idfy', (req, res, next) => {
    console.log(req.params.idfy);
    Student.findById(req.params.idfy)
        .then(result => {
            console.log(result);
            res.status(200).json({
                Studata: result
            })
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                msg: "ID is not present in the database"
            })
        })
})

router.post('/', (req, res, next) => {
    const stud = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,             // left vala vo naame hai jo schema mein define kiya, aur right vala vo jo frontend bhej rha
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
    })

    stud.save()
        .then(result => {
            console.log(result),
                res.status(200).json({
                    newStudent: result,
                })

        })

        .catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err,
                })
        })
})


//  Delete a DAta from Database using ID 

router.delete('/:idfy', (req, res, next) => {

    Student.remove({ _id: req.params.idfy })
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg: "Data is deleted successfully",
                dltStud: result,
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

module.exports = router;