const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
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

router.post('/signup', (req, res, next) => {

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


router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })                           // YAHA PAR USER MATCH KARENGE
        .exec()
        .then(useremail => {                                          // YAHA PAR USEREMAIL MEIN MATCHED DATA KA ARRAY HOGA
            if (useremail.length < 1) {

                return res.status(401).json({
                    msg: "User to exist he nahi karta...",

                })
            }
            bcrypt.compare(req.body.password, useremail[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        msg: " email or password is worng..."
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: useremail[0].email,
                        phone: useremail[0].phone,
                        name: useremail[0].name,
                        gender: useremail[0].gender,
                    },
                        'this is dummy text',                           // KEYY FOR CREATING JWT
                        {
                            expiresIn: "24h"
                        }

                    )
                    res.status(200).json({
                        email: useremail[0].email,
                        phone: useremail[0].phone,
                        name: useremail[0].name,
                        gender: useremail[0].gender,
                        token: token,
                    })
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                msg: "Something went wrong bhai....",
                error: err,
            })
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