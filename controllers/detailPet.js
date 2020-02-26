const Model = require("../models");
const Pet = Model.pet;
const User = Model.user;
const Species = Model.species;
const Age = Model.age;



exports.getDetail = (req,res) =>{
const idDetail = req.params.id;
const Body = req.body;
Pet.findOne({
    where : {id:idDetail},
    attributes: [
         "id",
         "name",
         "gender",
         "photo",
         "about"
       ],
    include:[
        {
            model:Species,
            attributtes:['id','name'],
            as:'species'
        },
        {
            model:Age,
            attributtes:['id','age'],
            as:'age'
        },
        {
            model:User,
            attributtes:['id','name','phone','address'],
            as:'user'
        }
    ]
         }).then(detailpet =>{

        if(detailpet){
            res.send({message :"Here are detail pets",Data:detailpet})
        }
        else{
            res.send({
              message: "there is trouble in getting detail pets"
            });
        }


         })
 }


