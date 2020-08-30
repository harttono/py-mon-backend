const Model             = require("../models");
const Ticket            = Model.ticket;
const TypeOfTrain       = Model.train;
const { Op }            = require("sequelize"); 

// insert new type product by admin
exports.InsertNewType = async (req, res) => {
   const {name} = req.body;
   const data = {
      name:name
   }
   const newProduct = await TypeOfTrain.create(data);
   if(newProduct){
    res.status(200).send({
      message:'Data has been created successfully',
      data:newProduct
    });
   }
};

// insert new type product by admin
exports.getType = async (req, res) => {
  const Product = await TypeOfTrain.findAll({});
  if(Product){
   res.status(200).send(Product);
  }
};

// insert new product by admin
exports.InsertNewTicket = async (req, res) => {
   const {name,type_train,age,start_date,start_station,start_time,destination,arrival_time,price,qty} = req.body;
   const data={
     name:name,
     type_train:type_train.id,
     age:age,
     start_date:start_date,
     start_station:start_station,
     start_time:start_time,
     destination:destination,
     arrival_time:arrival_time,
     price:price,
     qty:qty
   };
  const Product = await Ticket.create(data);
  if(Product){
    res.status(200).send({message:'Data has been created successfully',data:Product});
   }
};

// show products by user
exports.showProduct = async(req, res) => {
  const {start_date,date_gte,date_lte,start_station,destination} = req.query;
  if(start_date){
    const products = await Ticket.findAll({
    include: [{model: TypeOfTrain,attributes: ["id", "name"]}],where:{start_date:start_date}})  
    if(products){
      res.status(200).json(products);
      }
      else if(!data){
      res.status(404).json({message:'data not found'})
      }   
  }
  else if(date_gte && date_lte){
        Ticket.findAll({
          order:[['start_date','ASC']],
          attributes:["id","name","start_date","start_station","start_time","destination","arrival_time","price","qty"],
          include: [{model: TypeOfTrain,attributes: ["id", "name"]}],
          where:{
              [Op.and]:[
               {start_date:{[Op.gte]:date_gte}},
               {start_date:{[Op.lte]:date_lte}}
              ],
              start_station:{[Op.like]:`%${start_station}%`},
              destination:{[Op.like]:`%${destination}%`}
          }
        }).then(data => {
          res.send(data);
        });
      } 
    else{
        res.status(400).send({
          error:'not found data',
          message:"use these params[proxy]/product?start_time=2020-03-03 OR [proxy]/product?date_gte=2020-03-01&date_lte=2020-03-02&start_station=city&destination=city"
      });
   }           
};

// get product by user
exports.getProduct = async (req,res) =>{
  const id = req.params.id;
  const product = await Ticket.findAll({
    include: [{
      model: TypeOfTrain,
      attributes: ["id", "name"]
  }],
    where:{
      id:id
    }
  })
  if (product){
    res.send(product)
  }else{
    res.status(401).send({message:'data not found'})
  }
}
