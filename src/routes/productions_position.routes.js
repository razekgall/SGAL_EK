const express = require('express');
const router = express.Router();
const controller = require('../controllers/productions_position.controller');

router.post('/', controller.savePositions);

module.exports = router;