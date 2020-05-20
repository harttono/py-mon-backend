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
// const { baseUrl } = require("../config/myConfig");

// exports.myTickets = (req, res) => {
//   const userId = req.user.userId;
//   Order.findAll({
//     attributes: ["id", "trainId", "userId", "qty", "totalPrice", "status"],
//     include: [
//       {
//         model: Train,
//         attributes: [
//           "id",
//           "nameTrain",
//           "dateStart",
//           "startStation",
//           "startTime",
//           "destinationStation",
//           "arrivalTime",
//           "price",
//           "typeTrainId"
//         ],
//         as: "train",
//         include: [
//           {
//             model: TypeTrains,
//             attributes: ["id", "name"],
//             as: "typeTrain"
//           }
//         ]
//       },
//       {
//         model: User,
//         attributes: [
//           "id",
//           "name",
//           "username",
//           "email",
//           "gender",
//           "phone",
//           "address"
//         ],
//         as: "user"
//       }
//     ],

//     where: { userId: userId }
//   }).then(data => {
//     res.send(data);
//   });
// };

// exports.payment = (req, res) => {
//   const orderId = req.body.orderId;
//   if (orderId) {
//     if (req.file) {
//       const urlFile = `${baseUrl}${req.file.destination.replace(
//         /public\//g,
//         ""
//       )}${req.file.filename}`;
//       const dataUpdate = {
//         attachment: urlFile
//       };
//       Order.update(dataUpdate, { where: { id: orderId } }).then(updated => {
//         if (updated) {
//           Order.findOne({
//             attributes: [
//               "id",
//               "trainId",
//               "userId",
//               "qty",
//               "totalPrice",
//               "status",
//               "attachment"
//             ],
//             include: [
//               {
//                 model: Train,
//                 attributes: [
//                   "id",
//                   "nameTrain",
//                   "dateStart",
//                   "startStation",
//                   "startTime",
//                   "destinationStation",
//                   "arrivalTime",
//                   "price",
//                   "typeTrainId"
//                 ],
//                 as: "train",
//                 include: [
//                   {
//                     model: TypeTrains,
//                     attributes: ["id", "name"],
//                     as: "typeTrain"
//                   }
//                 ]
//               },
//               {
//                 model: User,
//                 attributes: [
//                   "id",
//                   "name",
//                   "username",
//                   "email",
//                   "gender",
//                   "phone",
//                   "address"
//                 ],
//                 as: "user"
//               }
//             ],

//             where: { id: orderId }
//           }).then(data => {
//             res.send(data);
//           });
//         }
//       });
//     } else {
//       res.status(401).send({
//         error: true,
//         message: "Required image picture"
//       });
//     }
//   } else {
//     res.status(401).send({
//       error: true,
//       message: "Id order null!"
//     });
//   }
// };

// exports.ordersAdmin = (req, res) => {
//   const admin = req.user.admin;
//   if (admin) {
//     Order.findAll({
//       attributes: [
//         "id",
//         "trainId",
//         "userId",
//         "qty",
//         "totalPrice",
//         "status",
//         "attachment"
//       ],
//       include: [
//         {
//           model: Train,
//           attributes: [
//             "id",
//             "nameTrain",
//             "dateStart",
//             "startStation",
//             "startTime",
//             "destinationStation",
//             "arrivalTime",
//             "price",
//             "typeTrainId"
//           ],
//           as: "train",
//           include: [
//             {
//               model: TypeTrains,
//               attributes: ["id", "name"],
//               as: "typeTrain"
//             }
//           ]
//         },
//         {
//           model: User,
//           attributes: [
//             "id",
//             "name",
//             "username",
//             "email",
//             "gender",
//             "phone",
//             "address"
//           ],
//           as: "user"
//         }
//       ]
//     }).then(data => {
//       res.send(data);
//     });
//   } else {
//     res.status(401).send({
//       error: true,
//       message: "Your not admin"
//     });
//   }
// };

// exports.ordersUser = (req, res) => {
//   const userId = req.user.userId;
//   Order.findAll({
//     attributes: ["id", "trainId", "userId", "qty", "totalPrice", "status"],
//     include: [
//       {
//         model: Train,
//         attributes: [
//           "id",
//           "nameTrain",
//           "dateStart",
//           "startStation",
//           "startTime",
//           "destinationStation",
//           "arrivalTime",
//           "price",
//           "typeTrainId"
//         ],
//         as: "train",
//         include: [
//           {
//             model: TypeTrains,
//             attributes: ["id", "name"],
//             as: "typeTrain"
//           }
//         ]
//       },
//       {
//         model: User,
//         attributes: [
//           "id",
//           "name",
//           "username",
//           "email",
//           "gender",
//           "phone",
//           "address"
//         ],
//         as: "user"
//       }
//     ],
//     where: { userId: userId }
//   }).then(data => {
//     res.send(data);
//   });
// };

// exports.putOrderById = (req, res) => {
//   const body = req.body;
//   const orderId = req.params.id;
//   const admin = req.user.admin;
//   if (admin) {
//     Order.update(body, { where: { id: orderId } }).then(updated => {
//       if (updated) {
//         Order.findOne({
//           attributes: [
//             "id",
//             "trainId",
//             "userId",
//             "qty",
//             "totalPrice",
//             "attachment",
//             "status"
//           ],
//           include: [
//             {
//               model: Train,
//               attributes: [
//                 "id",
//                 "nameTrain",
//                 "dateStart",
//                 "startStation",
//                 "startTime",
//                 "destinationStation",
//                 "arrivalTime",
//                 "price",
//                 "typeTrainId"
//               ],
//               as: "train",
//               include: [
//                 {
//                   model: TypeTrains,
//                   attributes: ["id", "name"],
//                   as: "typeTrain"
//                 }
//               ]
//             },
//             {
//               model: User,
//               attributes: [
//                 "id",
//                 "name",
//                 "username",
//                 "email",
//                 "gender",
//                 "phone",
//                 "address"
//               ],
//               as: "user"
//             }
//           ],

//           where: { id: orderId }
//         }).then(data => {
//           res.send(data);
//         });
//       }
//     });
//   } else {
//     res.status(401).send({
//       error: true,
//       message: "Your not admin"
//     });
//   }
// };

// exports.getOrderById = (req, res) => {
//   const orderId = req.params.id;
//   Order.findOne({
//     attributes: [
//       "id",
//       "trainId",
//       "userId",
//       "qty",
//       "totalPrice",
//       "status",
//       "attachment"
//     ],
//     include: [
//       {
//         model: Train,
//         attributes: [
//           "id",
//           "nameTrain",
//           "dateStart",
//           "startStation",
//           "startTime",
//           "destinationStation",
//           "arrivalTime",
//           "price",
//           "typeTrainId"
//         ],
//         as: "train",
//         include: [
//           {
//             model: TypeTrains,
//             attributes: ["id", "name"],
//             as: "typeTrain"
//           }
//         ]
//       },
//       {
//         model: User,
//         attributes: [
//           "id",
//           "name",
//           "username",
//           "email",
//           "gender",
//           "phone",
//           "address"
//         ],
//         as: "user"
//       }
//     ],
//     where: { id: orderId }
//   }).then(data => {
//     res.send(data);
//   });
// };

// exports.orderTicket = (req, res) => {
//   const trainId = req.body.trainId;
//   const qty = req.body.qty;
//   Train.findOne({
//     attributes: ["price"],
//     where: { id: trainId }
//   }).then(dataTrain => {
//     const totalPrice = dataTrain.price * qty;
//     const dataOrder = {
//       trainId: trainId,
//       userId: req.user.userId,
//       qty: qty,
//       totalPrice: totalPrice,
//       status: "Pending"
//     };
//     Order.create(dataOrder).then(order => {
//       if (order) {
//         const orderId = order.id;
//         Order.findOne({
//           attributes: [
//             "id",
//             "trainId",
//             "userId",
//             "qty",
//             "totalPrice",
//             "status",
//             "attachment"
//           ],
//           include: [
//             {
//               model: Train,
//               attributes: [
//                 "id",
//                 "nameTrain",
//                 "dateStart",
//                 "startStation",
//                 "startTime",
//                 "destinationStation",
//                 "arrivalTime",
//                 "price",
//                 "typeTrainId"
//               ],
//               as: "train",
//               include: [
//                 {
//                   model: TypeTrains,
//                   attributes: ["id", "name"],
//                   as: "typeTrain"
//                 }
//               ]
//             },
//             {
//               model: User,
//               attributes: [
//                 "id",
//                 "name",
//                 "username",
//                 "email",
//                 "gender",
//                 "phone",
//                 "address"
//               ],
//               as: "user"
//             }
//           ],
//           where: { id: orderId }
//         }).then(data => {
//           res.send(data);
//         });
//       } else {
//         res.status(400).send({
//           error: true,
//           message: "Add order error"
//         });
//       }
//     });
//   });
// };