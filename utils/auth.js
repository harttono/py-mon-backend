const jwt = require('jsonwebtoken');
const key = require('./secretKey');

exports.getToken = (user) =>{
    return jwt.sign({
        id:user.id,
        name:user.name,
        email:user.email,
        isAdmin:user.admin
    },key.secretKey,{
        expiresIn:'48h'
    })
}
exports.isAuth = (req,res,next) =>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,key.secretKey,(err,decode) =>{
            if(err){
                return res.status(401).send({message:'invalid token'})
            }
            req.user = decode;
            next()
            return
        })
    }else{
        return res.status(401).send({message:"token isn't supplied"})
    }
}
