const Model = require("../models");
const typeTrain = Model.train;

exports.getTypeTrain = async (req,res) => {
  try{
    const getType = await typeTrain.findAll({attributes:["id","name"]});
    if(getType){
        res.status(200).send({
            status:200,
            message:"success",
            getType
        });
    }else{
        res.status(404).send({
            status:404,
            message:"there is no type'train data "
        })
    }
  }catch(error){
      res.send(error);
  }
  


}

