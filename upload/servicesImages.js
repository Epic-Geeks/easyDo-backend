"use strict";

const multer = require("multer");
const path = require("path");
const uuid = require("uuid").v4;

const storage = multer.diskStorage({
  destination: "images/services/",
  filename: async (req, file, callBack) => {
   const newData = await req.body
    callBack(
      null,
      `${file.fieldname}_${newData.serviceCategory}_${uuid()}${path.extname(file.originalname)}`
      );
      console.log(newData , "req.body.providerID");

  },
});

const uploadService = multer({
  storage: storage,
});

module.exports = {
  uploadService,
};
