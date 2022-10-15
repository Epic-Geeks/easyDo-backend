"use strict";

const express = require("express");
const cors = require("cors");
const admin = require("./routes/admin.route");
const provider = require("./routes/provider.route");
const customer = require("./routes/customer.route");
const services = require("./routes/services.route");
const orders = require("./routes/orders.route");
const app = express();

app.use(cors());
app.use(express.json());

app.use(admin);
app.use(provider);
app.use(customer);
app.use(services);
app.use(orders);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

function run(port) {
  app.listen(port, () => console.log(`Hello from port: ${port}`));
}

module.exports = {
  run: run,
  app: app,
};
