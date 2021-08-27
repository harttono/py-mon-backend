const express = require("express");
const bcrypt = require("bcrypt");
const Model = require("../models");
const User = Model.user;
const util = require("../utils/auth");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const signinUser = await User.findOne({ where: { email: email } });
    if (signinUser) {
      if (bcrypt.compareSync(password, signinUser.password)) {
        return res.status(200).send({
          id: signinUser.id,
          username: signinUser.username,
          email: signinUser.email,
          picture: signinUser.picture,
          token: util.getToken(signinUser),
        });
      } else {
        return res.status(404).send({ message: "Invalid Password" });
      }
    } else {
      return res.status(401).send({ message: "Invalid Username or Password" });
    }
  } catch (err) {
    return res.status(500).send({ message: `error ${err}` });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userData = {
      username: username,
      email: email,
      password: password,
      picture: "http://localhost:4000/profile/account.png",
    };

    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        userData.password = hash;
        const newUser = await User.create(userData);
        if (newUser) {
          return res.status(200).send({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.admin,
            token: util.getToken(newUser),
          });
        } else {
          return res.status(404).send({ message: "invalid user data" });
        }
      });
    } else {
      return res.status(401).send({ message: "user already axists" });
    }
  } catch (err) {
    return res.status(500).send({ message: `error ${err}` });
  }
};
