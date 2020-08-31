const Model = require("../models");
const Order = Model.order;
const Ticket = Model.ticket;
const Type = Model.train;
const User = Model.user;

// get orders by admin
exports.orders = async(req,res) =>{
  const order = await Order.findAll({
    order:[["id","ASC"]],
      attributes:["id","qty","total_price","status","attachment"],
      include:[
        {
          model:User,
          attributes:["id","name","username","email","gender","phone","address"]
       },
       {
         model:Ticket,
         attributes:["id","name","start_date","start_station","start_time","destination","arrival_time","price","qty"],
          include:[{
            model:Type,
            attributes:["id","name"]
           }]
       }
      ]
  });
  if(order){
    res.status(200).send(order)
  }
  else{
    res.status(400).send({
      message:'bad request !!! make sure everything is ok '
    })
  }
}

//edit order by admin
exports.updateOrder = async(req,res) => {
  try {
    const orderId = req.params.id;
    const dataUpdate = {
      status : req.body.status
    }
    const update = await Order.update(dataUpdate,{
      where:{id:orderId}
    });
    if (update) {
      const Updated = await Order.findOne({
        where:{id:orderId},
        attributes: ["id","id_ticket","id_user","qty", "total_price", "status", "attachment"]
      });
      res.status(200).send({
        message: "Updated data is successfully",
        Updated
      });
    }
  } catch (error) {
    console.log(error)
  }
};

// delete order by admin
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

// new order by user
exports.createOrder = async (req,res) =>{
const {id_ticket,id_user,qty,total_price,status} = req.body;
Ticket.findOne({where :{id:id_ticket}}).then(dataTicket =>{
        const countInStock = dataTicket.qty;
        const lastStock = countInStock-qty;
        const dataUpdate = {
          qty:lastStock
        }
        Ticket.update(dataUpdate,{where:{id:id_ticket}}).then( updated => {
            const dataOrder = {
                  id_ticket : id_ticket,
                  id_user   : id_user,
                  qty       : qty,
                  total_price :total_price,
                  status      :status,
                  attachment  :'http://localhost:4000/payment/bca.jpg'
                }
            Order.create(dataOrder).then( result =>{
               if(result){
                      res.send(result)
               }else{
                      res.status(400).send({
                        error:true,
                        message :'failure in saving data'
                      })
               }
            })
        })    
  })
}

// get orders by user
exports.getOrderUser = (req,res) =>{
const {id} = req.user;
const {status} = req.query;
          if(status){
            Order.findAll({
                attributes:['id','id_ticket','id_user','qty','total_price','status','attachment','createdAt','updatedAt'],
                include:[
                  {
                  model:Ticket,
                  attributes:['id','name','start_date','age','start_station','start_time','destination','arrival_time','price','qty'],
                      include:[{model:Type,attributes:['id','name']}]
                  },
                  {
                    model:User,
                    attributes:['id','name','username','email','gender','phone','address']
                  }
                ],
                where:{
                    status:status,
                    id_user:id
                }
            }).then( data =>{
                if(data){
                  res.status(200).send(data)
                }else{
                  res.status(401).send({
                    message:'Unauthorized access'
                  })
                }
            })
          }
          else{
            Order.findAll({
              attributes:["id","id_ticket","id_user","qty","total_price","status","attachment"],
              include:[
                {
                  model:Ticket,
                  attributes:["id","name","start_date","age","start_station","start_time","destination","arrival_time","price","qty"],
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
              where : {id_user:id}
            }).then(data =>{
              res.send(data)
            })
        }
    }

  // update order by user
  exports.updateAttachmentOrder = async(req,res) => {
    try {
      const orderId = req.params.id;
      const dataUpdate = {
        attachment : req.body.attachment
      }
      const update = await Order.update(dataUpdate,{
        where:{id:orderId}
      });
      if (update) {
        const Updated = await Order.findOne({
          where:{id:orderId},
          attributes: ["id","id_ticket","id_user","qty", "total_price", "status", "attachment"]
        });
        res.status(200).send({
          message: "Updated data is successfully",
          Updated
        });
      }
    } catch (error) {
      console.log(error)
    }
  };