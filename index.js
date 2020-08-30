const express                = require("express");
const bodyparser             = require("body-parser");
                               require("express-group-routes");
const cors                   = require("cors");
const userRouter             = require('./controllers/userRoute');
const productRouter          = require('./controllers/productRoute');
const orderRouter            = require('./controllers/orderRoute');
const paymentRouter          = require('./controllers/paymentUploadRoute');
const profileRouter          = require('./controllers/profileUploadRoute');
const multer                 = require('multer');
const path                   = require('path');
const {isAuth}               = require('./utils/auth');
const app                    = express();
const PORT                   = 4000;
app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended: true}))
app.use('/payment',express.static('public/upload'));
app.use('/profile',express.static('public/profile'));
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin',"*");
  res.header('Access-Control-Allow-Headers',"*");
  res.header('Access-Control-Allow-Methods',"*");
  next();
})

// config diskStorage payment 
const storagePayment = multer.diskStorage({
    destination:'./public/upload',
    filename: (req, file, cb) => {
       return  cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const uploadPayment = multer({
    storage:storagePayment
});
// end config diskStorage payment

// config diskStorage profile 
const storageProfile = multer.diskStorage({
  destination:'./public/profile',
  filename: (req, file, cb) => {
     return  cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});
const uploadProfile = multer({
  storage:storageProfile
});
// end config diskStorage profile


// all routes database
app.group("/api/v1", router => {
  router.post("/signin",userRouter.login);
  router.post("/register",userRouter.register);
  router.get("/createAdmin",userRouter.createAdmin);
  router.patch('/user/:id',isAuth,userRouter.updateUser);

  router.get("/products",productRouter.showProduct); 
  router.get("/product/:id",productRouter.getProduct);
  router.post("/newtype",isAuth,productRouter.InsertNewType);
  router.get("/newtype",isAuth,productRouter.getType);
  router.post("/products",isAuth,productRouter.InsertNewTicket);

  
  router.get('/order',isAuth,orderRouter.getOrderUser);
  router.post('/payment',uploadPayment.single('payment'),paymentRouter.uploadPayment);
  router.post('/profile',uploadProfile.single('profile'),profileRouter.uploadProfile);
  router.patch('/upload/:id',isAuth,orderRouter.updateAttachmentOrder);
  router.post('/order',isAuth,orderRouter.createOrder);

  router.get('/orders',isAuth,orderRouter.orders);
  router.delete('/order/:id',isAuth,orderRouter.delete);
  router.patch('/order/:id',isAuth,orderRouter.updateOrder);
});
app.listen(process.env.PORT || PORT);
