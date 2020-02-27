const Model = require('../models')
const Payment = Model.payment
const User = Model.user
const jwt = require('jsonwebtoken')

// function decode jwt
const verifyJwt = (jwtHeader)=>{
    let jwtData;
    let authorization = jwtHeader.split(' ')[1], decoded;
    try {
        decoded = jwt.verify(authorization,"harttonz");
        jwtData = {
            error: false,
            values: decoded
        }
    } catch (e) {
        jwtData = {
            error: true,
            values: null
        }
    }
    return jwtData
}


exports.paying = (req, res) =>{
    const jwtData = verifyJwt(req.headers.authorization)
    if(!jwtData.error){
        const pyment = {
            no_rek: req.body.no_rek,
            proof_of_payment: req.body.proof_of_payment,
            status: req.body.status,
            id_user: jwtData.values.userId
        }
        Payment.create(pyment).then(datapayment => {
            if(datapayment){
                Payment.findOne({
                    include: [
                      {
                        model: User,
                        attributes: ["id", "breeder", "phone", "address", 'createdAt', 'updatedAt'],
                        as: "user"
                      }
                    ],
                    where: {id: datapayment.id},
                    attributes: ['no_rek', 'proof_of_payment', 'status'],
                    as:"payment"
                }).then(data => res.send(data))
                }else{
                res.status(400).send({
                    error: true,
                    message: "Error Insert Data"
                })
            }
        })
    }else{
        res.status(401).send({
            error: true,
            message: "You can't do,cause you're not user"
        })
    }
    
}

// Update Payment 
exports.updatePayment = (req, res)=>{
    const idPayment = req.params.id
    const jwtData = verifyJwt(req.headers.authorization)
    if(!jwtData.error){
      User.findOne({where:{id:jwtData.values.userId}}).then(datauser=>{
          if(datauser){
              Payment.update(req.body,{where: {id:idPayment}}).then(updated=>{
                  if(updated){
                      Payment.findOne({
                          include:[{
                              model:User,
                              attributes:["id","breeder","phone","address"],
                              as:"user"
                          }],
                          where:{id:idPayment},
                          attributes:["id","no_rek","proof_of_payment","status"]
                      }).then(show => res.send(show))
                  }
               })
               }else{
              res.status(401).send({
                  error:true,
                  message:"You aren't admin,right ????"
              });
          }
      })
    }else{
        res.status(401).send({
            error:true,
            message:"authorized only can do it,error happened"
        })
    }
}