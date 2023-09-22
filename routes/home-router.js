const express = require('express');
const router = express.Router();
const homeController = require("../controllers/home-controller.js");

/* GET home page. */
router.get('/', homeController.index);
router.get('/about', homeController.about);

module.exports = router;
