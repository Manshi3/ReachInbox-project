const express = require('express');
const googleRouter = express.Router();
const {
    auth,
    callback,
    getUser,
    getMails,
    getMail,
    sendMail
} = require('../controllers/googleController');

googleRouter.get('/auth', auth);
googleRouter.get('/auth/callback', callback);
googleRouter.get('/user', getUser);
googleRouter.get('/mails', getMails);
googleRouter.get('/mails/:msgId', getMail);
googleRouter.post('/send', sendMail);

module.exports = googleRouter;


