var express = require('express');

var multer  = require('multer');

var controller = require('../controllers/books.controller');

var router = express.Router();

var upload = multer({ dest: 'public/uploads/' });

router.get('/', controller.index);

router.get('/view/:id', controller.view);

router.get('/delete/:id', controller.delete);

router.get('/update/:id', controller.update);

router.get('/create', controller.create);

router.post('/update/:id', controller.postUpdate);

router.post('/create', upload.single('cover'), controller.postCreate);

module.exports = router;