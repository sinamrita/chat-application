const express = require('express');
const { get_users } = require('../controllers/user');
const protectedRoute = require('../middlewares/protectedRoute')

const routes = express.Router();

routes.get('/get_users', protectedRoute ,get_users);

module.exports = routes;