const express = require('express');
const { login,signup, logout } = require('../controllers/auth');
const protectedRoute = require('../middlewares/protectedRoute')

const routes = express.Router();

routes.post('/login',login);
routes.post('/signup',signup);
routes.get('/logout', protectedRoute ,logout);

module.exports = routes;