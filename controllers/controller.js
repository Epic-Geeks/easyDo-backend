" use strict ";

const bcrypt = require("bcrypt");
const base64 = require("base-64");

const models = require("../models");

const signin = async (req, res) => {
  try {
    let reqURL = req.url.toLowerCase();
    let requested = reqURL.split("/")[1];
    let model = models[`${requested}Model`];

    const basicHeader = req.headers.authorization.split(" ");
    const encodedValue = basicHeader.pop();
    const decodedValue = base64.decode(encodedValue);
    const [username, password] = decodedValue.split(":");
    const user = await model.findOne({
      where: { username, suspend: false },
    });
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
    console.log("Error update record", e.message || e);
    return "Error update record", e.message || e;
  }
};

const signup = async (req, res) => {
  
  try {
    
        let reqURL = req.url.toLowerCase();
        let requested = reqURL.split("/")[1];
        let model = models[`${requested}Model`];
        req.body.password = await bcrypt.hash(req.body.password, 10);
    if (req.files) {
      req.body[`${requested}Pic`] = await req.files.map(
        (file) => `${process.env.BACKEND_URL}/${file.filename}`
      );
    }

    const user = await model.create(req.body);
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(403).send("Invalid Signup");
    }
  } catch (e) {
    console.log("Error update record: " + e.errors[0].message);
    return "Error update record: " + e.errors[0].message;
  }
};

module.exports = { signup, signin };

