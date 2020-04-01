const express             = require("express");
const bodyparser          = require("body-parser");
                            require("express-group-routes");
const cors = require("cors");
// const user = require("./controllers/user");
const { authenticated }      = require("./middleware");
const logginController       = require("./controllers/login");
const registerController     = require("./controllers/registration");

const getTypeTrainCTRL       = require("./controllers/typeTrain");
const ticketCTRL             = require('./controllers/ticket')
// const detailController    = require('./controllers/detailPet')
// const userController      = require('./controllers/user')
const paymentCTRL            = require("./controllers/payment")
const app = express();
// const port = procces.env.PORT || 5000;
const port = 4000;
app.use(bodyparser.json());
app.use(cors());
// cors
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin',"*");
  res.header('Access-Control-Allow-Headers',"*");
  res.header('Access-Control-Allow-Methods',"*");
  next();
})
app.group("/api/v1", router => {
// USER ROUTER
router.post("/register",registerController.register);
router.post("/login", logginController.login);
router.get("/checklogin", authenticated,logginController.checkLogin);
// TICKET ROUTER
// router.post("/addticket",ticketCTRL.InsertNewTicket);
// router.get("/allticket", ticketCTRL.showAllData);
// router.get("/tickets",ticketCTRL.getTicketsStartTime);
// router.get("/tickets/:id",ticketCTRL.getById);
// TYPE TRAIN ROUTER
// router.get("/gettypetrain", getTypeTrainCTRL.getTypeTrain);
// router.get("/my_tickets",authenticated,ticketCTRL.getMyTicket);

// ORDER ROUTER BY ADMIN
// router.get("/orders",paymentCTRL.allOrder);
// router.patch("/order/:id", authenticated, paymentCTRL.update);
// router.delete("/orders/:id",authenticated,paymentCTRL.delete);
// router.post("/order",authenticated,paymentCTRL.order);
// ORDER ROUTER BY USER
// router.get("/user/:id", authenticated,userController.showUser);


//payment router
// router.post("/order", authenticated,paymentCTRL.inserting);
// router.put("/payment/:id",paymentController.updatePayment);
});

app.get("/",(req,res)=>{
  res.send("hello,tehxh");
})


app.listen(port);
