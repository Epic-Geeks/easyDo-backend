"use strict";

const express = require("express");
const {
  createChat,
  updateChat,
  getChat,
  deleteChat,
} = require("../controllers/chat.controller");
// eslint-disable-next-line new-cap
const chat = express.Router();

chat.post("/chat", createChat);
chat.put("/chat/:customerID/:providerID", createChat, updateChat);
chat.get("/chat/:customerID/:providerID", getChat);

chat.delete("/chat/:id", deleteChat);

module.exports = chat;
