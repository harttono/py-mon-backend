const express = require("express");
const bodyparser = require("body-parser");
require("express-group-routes");
const cors = require("cors");
const userRouter = require("./controllers/userRoute");
const pocemonRouter = require("./controllers/pocemonRoute");
const { isAuth } = require("./utils/auth");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/profile", express.static("public/profile"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// all routes database
app.group("/api/v1", (router) => {
  router.post("/login", userRouter.login);
  router.post("/register", userRouter.register);
  router.post("/createPocemon", isAuth, pocemonRouter.createPocemon);
});
app.listen(PORT);
