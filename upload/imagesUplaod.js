"use strict";

const multer = require("multer");
const path = require("path");
const uuid = require("uuid").v4;
multer.diskStorage ({destination: "images/services/"})
multer.diskStorage ({destination: "images/customers/"})
multer.diskStorage ({destination: "images/providers/"})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let reqURL = req.url.toLowerCase();
    let requested = reqURL.split("/")[1];
   
    cb(null,`images/${requested}s`);
  },
  // destination: "images/customers/",
  filename: async (req, file, callBack) => {
   const newData = await req.body
    callBack(
      null,
      `${file.fieldname}_${newData.username}_${uuid()}${path.extname(file.originalname)}`
      );
      console.log(newData , "req.body.providerID");

  },
});
const imgUpload = multer({
  storage: storage,
});

module.exports = {
  imgUpload,
};
