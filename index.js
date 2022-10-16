"use strict";

require("dotenv").config();
const server = require("./server");
const { db } = require("./models/index");
const PORT = process.env.PORT || 3002;

db.sync()
  .then(() => {
    server.run(PORT);
  })
  .catch((e) => {
    console.log("Error starting server", e.message);
  });
