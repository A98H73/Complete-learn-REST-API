const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt')

router.get('/', (req, res, next) => {
    User.find()
        .then(result => {
            console.log(result);
            res.status(200).json({
                UserData: result,
            })
        })

        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err,
            })
        })
})

router.post('/', (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err,
            })
        }
        else {
            const usr_data = new User({

                _id: new mongoose.Types.ObjectId,
                name: req.body.name,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                gender: req.body.gender,
            })

            usr_data.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        msg: "SignUP Successful Man!...",
                        UserData: result,
                    })
                })

                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        msg: "Something Went Wrong Bhaiya ji!...",
                        error: err,
                    })
                })
        }
    })
})

// USER Delete Code

router.delete('/:idfy', (req, res, next) => {
    console.log(req.params.idfy);
    User.remove({ _id: req.params.idfy })
        .then(result => {
            console.log(result);
            res.status(200).json({
                Usrdelete: result,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            })
        })
})


module.exports = router;