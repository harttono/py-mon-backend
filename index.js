const express             = require("express");
const bodyparser          = require("body-parser");
                            require("express-group-routes");
const cors = require("cors");
const { authenticated }      = require("./middleware");
const logginController       = require("./controllers/login");
const registerController     = require("./controllers/registration");

const trainController        = require("./controllers/typeTrain");
const ticketController       = require('./controllers/ticket')
const orderController        = require('./controllers/order')
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
// user endpoint
  router.post("/register",registerController.register);
  router.post("/login", logginController.login);
  router.get("/checklogin", authenticated,logginController.checkLogin);
// ticket endpoint
  router.post("/addticket",ticketController.InsertNewTicket);
  router.get("/tickets",ticketController.getTicketsStartTime);
// router.get("/allticket", ticketCTRL.showAllData);
// router.get("/tickets/:id",ticketCTRL.getById);
// train endpint
  router.get("/gettypetrain",trainController.getTypeTrain);
// router.get("/my_tickets",authenticated,ticketCTRL.getMyTicket);

// order endpoint
router.post("/order",authenticated,orderController.orderTicket);// order ticket By User
router.get("/orders",authenticated,orderController.getTicketUser);// show data order User
router.get("/orderAdmin",authenticated,orderController.getAllDataOrder);// show data order User
router.patch("/order/:id", authenticated,orderController.updateOrderStatus);// update data order by admin
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
