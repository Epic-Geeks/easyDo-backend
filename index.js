"use strict";

require("dotenv").config();
const server = require("./server");
const { db } = require("./models/index");
const PORT = process.env.PORT || 3001;

db.sync({})
  .then(() => {
    server.run(PORT);
  })
  .catch((e) => {
    console.log("Error starting server", e.message);
  });
