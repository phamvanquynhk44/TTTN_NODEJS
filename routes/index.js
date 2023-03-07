var express = require('express');
var router = express.Router();
var frondtendController = require('../controllers/frontendController');
var backendController = require('../controllers/backendController');

/* Frontend */
router.get('/', frondtendController.home);
router.get('/detail/:id', frondtendController.detail);
router.get('/register', frondtendController.register);
router.use('/doRegister', frondtendController.doRegister);
router.get('/login', frondtendController.login);
router.post('/doLogin', frondtendController.doLogin);
router.get('/logout', frondtendController.logout);
router.get('/fogotpass', frondtendController.fogotpass);
router.post('/sendMail', frondtendController.sendMail);
router.get('/resetpass/:id', frondtendController.resetpass);
router.post('/doResetpass', frondtendController.doResetpass);
//Backend
router.get('/loginAdmin', backendController.loginAdmin);
router.post('/doLoginAdmin', backendController.doLoginAdmin); 
router.get('/admin/:id', backendController.admin);
module.exports = router;
