" use strict ";

const bcrypt = require("bcrypt");
const base64 = require("base-64");

const models = require("../models");
const { providerModel, customerModel, adminModel } = require("../models");
const { Sequelize } = require("sequelize");

const signin = async (req, res) => {
  try {
    let reqURL = req.url.toLowerCase();
    let requested = reqURL.split("/")[1];
    let model = models[`${requested}Model`];

    const basicHeader = req.headers.authorization.split(" ");
    const encodedValue = basicHeader.pop();
    const decodedValue = base64.decode(encodedValue);
    const [userVer, password] = decodedValue.split(":");

    const user =
      (await adminModel.findOne({
        where: Sequelize.and(
          { suspend: false },
          Sequelize.or({ username: userVer }, { email: userVer })
        ),
      })) ||
      (await providerModel.findOne({
        where: Sequelize.and(
          { suspend: false },
          Sequelize.or({ username: userVer }, { email: userVer })
        ),
      })) ||
      (await customerModel.findOne({
        where: Sequelize.and(
          { suspend: false },
          Sequelize.or({ username: userVer }, { email: userVer })
        ),
      }));

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        return res.status(200).json(user);
      } else {
        return res.status(401).send("You are not authorized");
      }
    } else {
      return res.status(401).send("You are not authorized");
    }
  } catch (error) {
    console.log("Error update record");
    return res.send("Error update record");
  }
};

const signup = async (req, res) => {
  try {
    let reqURL = req.url.toLowerCase();
    let requested = reqURL.split("/")[1];
    let model = models[`${requested}Model`];
    req.body.password = await bcrypt.hash(req.body.password, 10);
    if (req.files) {
      req.body.picture = await req.files.map(
        (file) => `${process.env.BACKEND_URL}/${file.filename}`
      );
    }
    console.log("req.body", req.body);

    const user = await model.create(req.body);
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(403).send("Invalid Signup");
    }
  } catch (e) {
    console.log("Error update record: " + e);
    return res.send("Error update record: " + e);
  }
};

module.exports = { signup, signin };
