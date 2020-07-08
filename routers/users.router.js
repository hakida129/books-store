var express = require('express');

var controller = require('../controllers/users.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/view/:id', controller.view);

router.get('/delete/:id', controller.delete);

router.post('/create', controller.postCreate);

module.exports = router;