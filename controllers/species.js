const Species = require("../models").species;
exports.store = (req, res) => {
    Species.create(req.body).then(content =>{
      if(content){
      res.send({
        id: content.id,
        species: content.name,
        message: "Species'data has been added successfully !!!"
      });
      }else{
          res.status(400).send({
            error: true,
            message: "Species'data failed to insert"
          });
      }
      
  })
};

exports.getAll=(req, res) => {
   Species.findAll().then(content =>{
     res.send({message:"success !!!",Data : content})
   })
};
     