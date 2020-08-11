const jwt = require('jsonwebtoken')
const Model = require('../models')
const User = Model.user
exports.register = (req,res) => {
  const body = req.body;
  const userData = {
        name: body.name,
        username: body.username,
        email: body.email,
        password:body.password,
        gender: body.gender,
        phone: body.phone,
        address: body.address,
        role:"User",
        admin:0
      };
  console.log(userData);
  User.create(userData).then(user => {
        if (user) {
          const token = jwt.sign({ userId: user.id },"harttonz");
            res.send({
                message:"success",
                email: user.email,
                token: token
              });
            }
           else {
            res.status(400).send({
            error: true,
            message: "You've got error,make sure that's right"
          });
        }
      }); 

  }
























