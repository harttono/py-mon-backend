// const jwt = require("jsonwebtoken");
// const User = require("../../models").user;

// exports.auth = async (req, res) => {
//   try {
//     const username = req.body.username;
//     const password = req.body.password;
//     const data = await User.findOne({ where: { username, password } });
//     if (data) {
//       const token = jwt.sign({ userId: data.id }, "harttonz");
//       res.send({
//         msg: "success",
//         username: data.username,
//         status: data.status,
//         token
//       });
//     } else {
//       res.status(401).send({
//         message: "wrong username and password"
//       });
//     }
//   } catch (error) {
//     res.status(401).send({
//       message: "Error Happened"
//     });
//   }
// };
