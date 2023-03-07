var express = require('express');
var router = express.Router();
var frondtendController = require('../controllers/frontendController');

/* GET home page. */
router.get('/:id', frondtendController.collections);

module.exports = router;
