const Model = require('../models')
const Payment = Model.payment
const User = Model.user
const jwt = require('jsonwebtoken')

const {secretKey} = require('../config/secretKey')

// function decode jwt
const verifyJwt = (jwtHeader)=>{
    let jwtData;
    let authorization = jwtHeader.split(' ')[1], decoded;
    try {
        decoded = jwt.verify(authorization, secretKey);
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
        Payment.update(req.body,{where:{id:idPayment}}).then(payment =>{
             res.send({data : payment})
            //  if(payment){
            //  Payment.findOne({
            //      include:[
            //          {
            //              model:User,
            //              attributes:["id","breeder","phone","address","createdAt","updatedAt"],
            //              as :"user"
            //          }
            //      ]
            //  }).then(show =>{
            //      res.send({ data: req.body});
            //  })
            //  } 
         })
        
    }
}
         