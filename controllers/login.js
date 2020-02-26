const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { secretKey } = require('../config/secretKey')
const Model = require('../models')
const User = Model.user

exports.login = (req, res)=>{
    const email = req.body.email
    const password = req.body.password
    User.findOne({where: {email}}).then(user => {
        if(user){
            // verify bcrypt password
            bcrypt.compare(password, user.password, function(err, resBcrypt) {
                if(resBcrypt) {
                    const token = jwt.sign({userId: user.id}, secretKey)
                    res.send({
                        email: user.email,
                        token: token
                    })
                } else {
                    res.status(401).send({
                        error: true,
                        message: "Wrong Password!"
                    })
                } 
            });
        }else{
            res.status(401).send({
                error: true,
                message: "Wrong Email or Password!"
            })
        }
    })
}