const Model = require("../models");
const Order = Model.payment;
const Ticket = Model.ticket;
const Type = Model.train;
const User = Model.user;

exports.getAllDataOrder = (req,res) =>{
 Order.findAll({
      order:[["id","ASC"]],
      attributes:["id","qty","total_price","status","attachment"],
      include:[
        {
        model:User,
        attributes:["id","name","username","email","gender","phone","address"],
       },
       {
         model:Ticket,
         attributes:["id","name","start_date","start_station","start_time","destination","arrival_time","price","qty"],
         include :[
          {
            model:Type,
            attributes:["id","name"]
          }
        ]
       },
       ]
    }).then(data =>{ 
      res.send(data)
  })
}

//edit order user 
exports.updateOrderStatus = async(req,res) => {
  try {
    const idOrder = req.params.id;
    const dataUpdate = {
      status : req.body.status
    }
    const update = await Order.update(dataUpdate, {
      where: {id: idOrder}
    });
    if (update) {
      const Updated = await Order.findOne({
        where: { id: idOrder },
        attributes: ["id","id_ticket","id_user","qty", "total_price", "status", "attachment"]
      });
      res.status(200).send({
        status: 200,
        message: "success",
        Updated
      });
    }
  } catch (error) {
    console.log(error)
  }
};
// delete order user
exports.delete = async(req,res)=>{
  const id = req.params.id;
  try{
    const deleted= await Order.destroy({where:{id:id}});
    if(deleted){
      res.send({
        message:"Data has been deleted successfully",id
      })
    }else{
        res.send({
        message:"failed deleted"
      })
    }
  }catch(error){
    console.log(error)
  }
}
exports.orderTicket = (req,res) =>{
const TicketiD = req.body.TicketiD;
const Qty      = req.body.Qty;
Ticket.findOne({attributes:["price"],where : {id:TicketiD}}).then(dataTicket =>{
        const totalPrice =(dataTicket.price*Qty);
        console.log("total",totalPrice);
        const dataOrder ={
            id_ticket : TicketiD,
            id_user   : req.user.userId,
            qty       : Qty,
            total_price : totalPrice,
            status      :"Pending",
            attachment  :"bca.jpg"
          }
Order.create(dataOrder).then(order =>{
  console.log(dataOrder);
          if(order){
            const idOrder = order.id;
            console.log(idOrder);
            Order.findOne({
              attributes:["id","id_ticket","id_user","qty","total_price","status","attachment"],
              include:[
                {
                  model:Ticket,
                  attributes:["id","name","start_date","start_station","start_time","destination","arrival_time","price","qty"]
                },
                {
                  model:User,
                  attributes:["id","name","username","email","gender","phone","address"]
                }
              ],
              where:{id:idOrder}
            }).then(data =>{
              res.send(data)
            })
          }else{
            res.status(400).send({
              error:true,
              message :'failure in creating order data'
              })
           }
      })
  })
}
exports.getTicketUser = (req,res) =>{
const UserId = req.user.userId;
Order.findAll({
    attributes:["id","id_ticket","id_user","qty","total_price","status","attachment"],
    include:[
      {
        model:Ticket,
        attributes:["id","name","start_date","start_station","start_time","destination","arrival_time","price","qty"],
          include:[
            {
              model:Type,
              attributes:["id","name"]
            }
          ]
      },
      {
        model:User,
        attributes:["id","name","username","email","gender","phone","address"]
      }
    ],
    where : {id_user:UserId}
  }).then(data =>{
    res.send(data)
  })
}
