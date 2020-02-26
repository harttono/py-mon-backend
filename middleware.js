const expressjwt = require('express-jwt')
const Isloggedin = true
exports.authenticated = (req,res,next)=>{
   if(Isloggedin)
   next()
   else{
       res.send({
           message:"You are Unauthenticated"
       })
   }
}