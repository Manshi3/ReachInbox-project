const express = require("express");
require("dotenv").config();
const { google } = require('googleapis');
const fs = require('fs');
const fs1 = require('node:fs/promises');
// const { createConfig } = require("../helpers/utils");
// const axios = require("axios");
// const { connection, redisGetToken, } = require("../middlewares/redis.middleware");
// const { ConfidentialClientApplication } = require("@azure/msal-node");
const { analyzeEmailContent, generateResponse} = require("../helpers/openai");

const oAuth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

const scopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
];

const auth = (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    res.send({ url: authUrl });
};

const callback = async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send("Authorization code missing.");
    }
    
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        console.log('tokens: ', tokens);

        fs.writeFile('../token.json', JSON.stringify(tokens), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', 'token.json');
        });

        oAuth2Client.setCredentials(tokens);

        // const { access_token, scope } = tokens;
    
        // accessToken = access_token;
        // console.log('token: ', access_token);
        // if (scope.includes(scopes.join(" "))) {
        //     res.send("User is authorized");
        // } else {
        //     res.send("Restricted scopes test failed: Scopes are not restricted.");
        // }
        res.send("User is authorized");
    } catch (error) {
        console.error("Error exchanging authorization code:", error.message);
        res.status(500).send("Error exchanging authorization code.");
    }
};

const getUser = async (req, res) => {
    try{
        const content = await fs1.readFile('../token.json');
        const tokens = JSON.parse(content);
        console.log('token: ', tokens);
        if (!tokens.access_token) {
            console.log("Token not found , Please login again to get token");
            return res.send("Token not found , Please login again to get token");
        }
        oAuth2Client.setCredentials(tokens);
        const oauth = google.oauth2({ 
            version: 'v2', 
            auth: oAuth2Client 
        });
        const response = await oauth.userinfo.get();
        const profile = response.data;
        res.send(response.data);
    } catch (error) {
        console.log("Can't get user data: ", error.message);
        res.send(error.message);
    }
};

const getMails = async (req, res) => {
    try{
        const content = await fs1.readFile('../token.json');
        const tokens = JSON.parse(content);
        console.log('token: ', tokens);
        if (!tokens.access_token) {
            console.log("Token not found , Please login again to get token");
            return res.send("Token not found , Please login again to get token");
        }
        oAuth2Client.setCredentials(tokens);
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client});
        const response = await gmail.users.messages.list({ userId: 'me', q: 'is:unread' });
        const messages = response.data.messages;
        if (!messages || messages.length === 0) {
            console.log('No new messages.');
            return;
        }
        res.send(messages);
    } catch(error) {
        console.log("Can't get messages: ", error.message);
        res.send(error.message);
    }
};

const getMail = async (req, res) => {
    const { msgId } = req.params; 
    console.log("msgId: ", msgId);
    try{
        const content = await fs1.readFile('../token.json');
        const tokens = JSON.parse(content);
        console.log('token: ', tokens);
        if (!tokens.access_token) {
            console.log("Token not found , Please login again to get token");
            return res.send("Token not found , Please login again to get token");
        }
        oAuth2Client.setCredentials(tokens);
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client});
        const response = await gmail.users.messages.get({ userId: 'me', id: msgId });
        const messages = response.data;
        res.send(messages);
    } catch(error) {
        console.log("Can't get messages: ", error.message);
        res.send(error.message);
    }
};

const sendMail = async (req, res) => {
    const { email } = req.body.email; 
    console.log("email: ", email);
    try{
        const content = await fs1.readFile('../token.json');
        const tokens = JSON.parse(content);
        console.log('token: ', tokens);
        if (!tokens.access_token) {
            console.log("Token not found , Please login again to get token");
            return res.send("Token not found , Please login again to get token");
        }
        oAuth2Client.setCredentials(tokens);
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client});
        const response = await gmail.users.messages.send({
            userId: 'me', 
            requestBody: {
                raw: email
            }
        });
    } catch(error) {
        console.log("Can't get messages: ", error.message);
        res.send(error.message);
    }
};

module.exports = {
    auth,
    callback,
    getUser,
    getMails,
    getMail,
    sendMail
};
