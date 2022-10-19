"use strict";

const multer = require("multer");
const path = require("path");
const uuid = require("uuid").v4;

const storage = multer.diskStorage({
  destination: "images/providers/",
  filename: async (req, file, callBack) => {
   const newData = await req.body
    callBack(
      null,
      `${file.fieldname}_${newData.username}_${uuid()}${path.extname(file.originalname)}`
      );
      console.log(newData , "req.body.providerID");

  },
});

const uploadProvider = multer({
  storage: storage,
});

module.exports = {
  uploadProvider,
};
