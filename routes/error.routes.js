const express = require('express');
const router = express.Router();

const error_controller = require('../controllers/errror.controller');

router.use(error_controller.sendErrorPage);

module.exports = router;