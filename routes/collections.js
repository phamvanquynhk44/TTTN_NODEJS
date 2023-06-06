var express = require('express');
var router = express.Router();
var frondtendController = require('../controllers/frontendController');

/* GET home page. */
router.get('/:id/:sort', frondtendController.collections);

module.exports = router;
