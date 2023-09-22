const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userController = require("../controllers/user-controller.js");

router.post('/reg', userController.addUser);

router.get('/reg', userController.registerPage);

module.exports = router;