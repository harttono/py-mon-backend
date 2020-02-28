  
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Model = require('../models')
const User = Model.user
const Pet = Model.pet

exports.register = (req, res) => {
  const body = req.body;
  bcrypt.hash(body.password, 11, function(err, hash) {
    if (!err) {
      const userData = {
        breeder: body.breeder,
        email: body.email,
        password: hash,
        phone: body.phone,
        address: body.address
      };
      User.create(userData).then(user => {
        if (user) {
          const token = jwt.sign({ userId: user.id },"harttonz");
          const petData = {
            name: body.pet.name,
            gender: body.pet.gender,
            id_species: body.pet.species.id,
            id_age: body.pet.age.id,
            id_user: user.id
          };
          Pet.create(petData).then(pet =>{
            if (pet) {
              res.send({
                email: user.email,
                token: token
              });
            } else {
              res.status(400).send({
                error: true,
                message: "Pet's failed inserted"
              });
            }
          });
        } else {
          res.status(400).send({
            error: true,
            message: "Data user not insert"
          });
        }
      });
    } else {
      res.status(400).send({
        error: true,
        message: "Bcrypt error"
      });
    }
  });
};

























