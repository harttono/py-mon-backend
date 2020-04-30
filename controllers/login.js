const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Model = require("../models");
const User = Model.user;
exports.login = (req, res) => {
    const { username, password } = req.body;
    console.log(username,password);
    User.findOne({ where: {username:username}}).then(user =>{
    if (user){
        bcrypt.compare(password,user.password,function(err,Resbcrypt){
         if (Resbcrypt){
          const  token = jwt.sign({userId: user.id,admin: user.admin},"harttonz");
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
                message: "Wrong Password!"
             });
          }
       });
      }else{
        res.status(401).send({
          message: "wrong password and email"
        });
      }
  });
}
// show user based on id 
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