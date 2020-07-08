var express = require('express');

var controller = require('../controllers/transactions.controller');

var router = express.Router();

router.get('/', controller.index);

router.post('/create', controller.create);

router.get('/complete/:id', controller.isComplete);

module.exports = router;