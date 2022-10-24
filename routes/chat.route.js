"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const chat = express.Router();
const { chatModel } = require("../models");

chat.post("/chat", createChat);
chat.put("/chat/:customerID/:providerID", createChat, updateChat);
chat.get("/chat/:customerID/:providerID", getChat);

chat.delete("/chat/:id", deleteChat);

const errorObj = (error) => {
    return {
        message: error,
        status: 500
    }
};

async function createChat(req, res, next) {
    try {
        const { customerID, providerID } = req.params;
        console.log(customerID, providerID);
        if (customerID && providerID) {
            let chat = await chatModel.findOne({ where: { customerID: customerID, providerID: providerID } });
            if (!chat) {
                chat = await chatModel.create({ customerID: customerID, providerID: providerID });
                return next()
            } else {
                return next();
            }
        }
        console.log(req.body);
        let newChat = await chatModel.create(req.body);
        return res.status(201).json(newChat);
    } catch (error) {
        console.log(error);
        next(errorObj(error));
    }
}

async function getChat(req, res) {
    try {
        const { customerID, providerID } = req.params;
        let chat = await chatModel.findOne({ where: { customerID: customerID, providerID: providerID } });
        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        next(errorObj(error));
    }
}


async function updateChat(req, res) {
    try {
        console.log(req.body.ChatMessages);
        if (!req.body.ChatMessages[0]) {
            return res.end();
        }
        const { customerID, providerID } = req.params;
        console.log(customerID, providerID);
        const old = await chatModel.findOne({ where: { customerID: customerID, providerID: providerID } });
        console.log(req.body.ChatMessages[0]);
        console.log(old.ChatMessages);
        const newArr = [...old.ChatMessages, req.body.ChatMessages[0]];
        console.log(old);
        const newChat = await old.update({ ChatMessages: newArr });
        res.status(200).json(newChat);
    } catch (error) {
        console.log(error);
        next(errorObj);
    }
}

async function deleteChat(req, res) {
    try {
        const { id } = req.params;
        const deletedChat = await chatModel.destroy({ where: { id: id } });
        res.status(200).json(deletedChat);
    } catch (error) {
        console.log(error);
        next(errorObj(error));
    }
}


module.exports = chat;
