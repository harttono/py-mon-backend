const jwt = require("jsonwebtoken");
const Model = require("../models");
const User = Model.user;
exports.login = (req, res) => {
    const username= req.body.username;
    const password= req.body.password;
    User.findOne({ where: {username:username,password:password}}).then(user =>{
    if (user){
          const  token = jwt.sign({userId: user.id},"harttonz");
          res.status(200).send({
            message: "success",
            username: user.username,
            role: user.role,
            admin: user.admin,
            token: token
          });
         }else{
              res.status(401).send({
                error: true,
                message: "wrong password and email !"
             });
          }
       });
}
exports.checkLogin = async (req,res) =>{
 try{
 const data = await User.findOne({
   where:{id:req.user.userId},
   attributes:["id","username","role","admin"]
 });
 res.send({ data});
}catch(error){
   console.log(error.message);
 }

}