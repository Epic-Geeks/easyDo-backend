" use strict ";

const bcrypt = require("bcrypt");
const base64 = require("base-64");

const Customer = require("../models").customerModel;

const signin = async (req, res) => {
 const basicHeader = req.headers.authorization.split(" ");
 const encodedValue = basicHeader.pop();
 const decodedValue = base64.decode(encodedValue);
 const [username, password] = decodedValue.split(":");
 const user = await Customer.findOne({ where: { username } });
 if (user) {
  const isSame = await bcrypt.compare(password, user.password);
  if (isSame) {
   return res.status(200).json({
    user: {
     username: user.username,
     email: user.email,
    },
    token: user.token,
   });
  } else {
   return res.status(401).send("You are not authorized");
  }
 } else {
  return res.status(401).send("You are not authorized");
 }
};

const signup = async (req, res) => {
 const { username, email, password } = req.body;
 const output = {
  username,
  email,
  password: await bcrypt.hash(password, 10),
 };
 const user = await Customer.create(output);
 if (user) {
  res.status(201).json({
   user: {
    username: user.username,
    email: user.email,
   },
   token: user.token,
  });
 } else {
  res.status(403).send("Invalid Signup");
 }
};

module.exports = { signup, signin };
