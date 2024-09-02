const express = require('express');
const { send_message, get_messages } = require('../controllers/messages');
const protectedRoute = require('../middlewares/protectedRoute')

const routes = express.Router();

routes.post('/send/:id', protectedRoute ,send_message);
routes.get('/get_msg/:id', protectedRoute ,get_messages);

module.exports = routes;