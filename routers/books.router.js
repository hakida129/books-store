var express = require('express');

var controller = require('../controllers/books.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/view/:id', controller.view);

router.get('/delete/:id', controller.delete);

router.get('/update/:id', controller.update);

router.get('/create', controller.create);

router.post('/update/:id', controller.postUpdate);

router.post('/create', controller.postCreate);

module.exports = router;