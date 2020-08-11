const express                = require("express");
const bodyparser             = require("body-parser");
                               require("express-group-routes");
const cors                   = require("cors");
const { authenticated }      = require("./middleware");
const logginController       = require("./controllers/login");
const registerController     = require("./controllers/registration");

const trainController        = require("./controllers/typeTrain");
const ticketController       = require('./controllers/ticket')
const orderController        = require('./controllers/order')
const app                    = express();
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
// train endpint
  router.get("/gettypetrain",trainController.getTypeTrain);

// order endpoint
router.post("/order",authenticated,orderController.orderTicket);// order ticket By User
router.get("/orders",authenticated,orderController.getTicketUser);// show data order User
router.get("/orderAdmin",authenticated,orderController.getAllDataOrder);// show data order User
router.patch("/order/:id", authenticated,orderController.updateOrderStatus);// update data order by admin
});
app.listen(port);
