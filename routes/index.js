var express = require('express');
var router = express.Router();
var frondtendController = require('../controllers/frontendController');
var backendController = require('../controllers/backendController');
var cartController = require('../controllers/cartController');
var orderController = require('../controllers/ordersController');
var pageController = require('../controllers/pageController');
const {Template}=require('ejs');

var multer = require('multer');
var upload = multer({dest: 'public/img/logo'});

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

router.get('/account/:email/:id', frondtendController.account);
router.get('/showOrder/:email/:code/:token/:id', frondtendController.showOrder);
router.get('/showAdress/:email/:token', frondtendController.showAdress);
router.post('/doShowAdress', frondtendController.doShowAdress);
router.get('/search/:name', frondtendController.search);
router.post('/doSearch', frondtendController.doSearch);
router.post('/doSortCollections', frondtendController.doSortCollections);

router.get('/addFavorite/:token/:id/:status', frondtendController.addFavorite);
router.get('/favorite/:token', frondtendController.favorite);
router.get('/delFavorite/:token/:id', frondtendController.delFavorite);

//Backend
router.get('/loginAdmin', backendController.loginAdmin);
router.post('/doLoginAdmin', backendController.doLoginAdmin); 
router.get('/admin/:id', backendController.admin);
//catalog
router.get('/catalog/:id', backendController.catalog);
router.get('/catalogAdd/:token', backendController.catalogAdd);
router.post('/doCatalogAdd',upload.any(), backendController.doCatalogAdd);
router.get('/catalog/status/:token/:id/:tt', backendController.catalogStatus);
router.get('/catalog/delete/:token/:id', backendController.catalogDelete);
router.get('/catalogTrash/:token', backendController.catalogTrash);
router.get('/catalogTrash/restore/:token/:id', backendController.catalogTrashRestore);
router.get('/catalogTrash/destroy/:token/:id', backendController.catalogTrashDestroy);
router.get('/catalog/edit/:token/:id', backendController.catalogEdit);
router.post('/doCatalogEdit',upload.any(), backendController.doCatalogEdit);
//productBackend
router.get('/product/:id', backendController.product);
router.get('/product/status/:token/:id/:tt', backendController.productStatus);
router.get('/product/delete/:token/:id', backendController.productDelete);
router.get('/productBackendTrash/:token', backendController.productBackendTrash);
router.get('/productBackendTrash/restore/:token/:id', backendController.productBackendTrashRestore);
router.get('/productBackendTrash/destroy/:token/:id', backendController.productBackendTrashDestroy);
router.get('/productBackendAdd/:token', backendController.productBackendAdd);
router.post('/doProductBackendAdd',upload.any(), backendController.doProductBackendAdd);
router.get('/product/edit/:token/:id', backendController.productBackendEdit);
router.post('/doProductBackendEdit',upload.any(), backendController.doProductBackendEdit);
//accountBackend
router.get('/accountBackend/:token', backendController.accountBackend);
router.get('/account/status/:token/:id/:tt', backendController.accountBackendStatus);
router.get('/account/delete/:token/:id', backendController.accountBackendDelete);
router.get('/accountBackendTrash/:token', backendController.accountBackendTrash);
router.get('/account/restore/:token/:id', backendController.accountBackendRestore);
router.get('/accountNull/:token', backendController.accountNull);
router.get('/accountBackendTrashNull/:token', backendController.accountBackendTrashNull);
router.get('/account/show/:token/:id', backendController.accountBackendShow);
router.get('/accountEdit/:token/:id', backendController.accountEdit);
//contactBackend
router.get('/contactBackend/:token', backendController.contactBackend);
router.get('/contactBackendStatus/:token/:id/:statusId', backendController.contactBackendStatus);
router.get('/contactBackendDelete/:token/:id', backendController.contactBackendDelete);
router.get('/contactBackendShow/:token/:id', backendController.contactBackendShow);
router.get('/contactBackendTrash/:token', backendController.contactBackendTrash);
router.get('/contactBackendRestore/:token/:id', backendController.contactBackendRestore);
router.get('/contactBackendDestroy/:token/:id', backendController.contactBackendDestroy);

//newsBackend
router.get('/newsBackend/:token', backendController.newsBackend);
router.get('/newsBackendStatus/:token/:id/:statusId', backendController.newsBackendStatus);
router.get('/newsBackendDelete/:token/:id', backendController.newsBackendDelete);
router.get('/newsBackendTrash/:token', backendController.newsBackendTrash);
router.get('/newsBackendRestore/:token/:id', backendController.newsBackendRestore);
router.get('/newsBackendDestroy/:token/:id', backendController.newsBackendDestroy);
router.get('/newsBackendShow/:token/:id', backendController.newsBackendShow);
router.get('/newsBackendAdd/:token', backendController.newsBackendAdd);
router.post('/doNewsBackendAdd',upload.any(), backendController.doNewsBackendAdd);
router.get('/newsBackendEdit/:token/:id', backendController.newsBackendEdit);
router.post('/doNewsBackendEdit',upload.any(), backendController.doNewsBackendEdit);
//chartBackend
router.get('/chart/:token', backendController.chart);
router.get('/chartToday/:token/:date', backendController.chartToday);
router.post('/doChartToday', backendController.doChartToday);
router.get('/chartProduct/:token', backendController.chartProduct);
router.post('/doChartProductToday', backendController.doChartProductToday);
router.get('/chartProductToday/:token/:date', backendController.chartProductToday);
router.get('/All', backendController.chartCustumer);
router.get('/AllProduct/:date', backendController.AllProduct);
//quản lý giỏ hàng
router.get('/order/:token', orderController.order);
router.get('/orderDetail/:token/:id', orderController.orderDetail);
router.get('/orderStatus/:token/:id/:status/:delivered', orderController.orderStatus);
//giỏ hàng
router.get('/addToCart/:id', cartController.addToCart);
router.get('/doKeyShowCart', cartController.doKeyShowCart);
router.get('/showCart', cartController.showCart);
router.get('/infoCart/:id', cartController.infoCart);
router.post('/sendMailCart', cartController.sendMailCart);
router.get('/checkoutCart/:token', cartController.checkoutCart);
router.post('/saveCart', cartController.saveCart);
router.get('/endCart', cartController.endCart);
router.get('/createOTP/:id/:token', cartController.createOTP);
router.post('/doCreateOTP', cartController.doCreateOTP);
router.get('/enterOTP/:id/:token', cartController.enterOTP);
router.post('/doEnterOTP', cartController.doEnterOTP);

router.get('/delCart/:id', cartController.delCart);
router.post('/updateCart', cartController.updateCart);
router.get('/delAllCart', cartController.delAllCart);
//pageController
router.get('/contact', pageController.contact);
router.post('/doContact', pageController.doContact);

//news
router.get('/news', pageController.news);
router.get('/newsDetail/:id', pageController.newsDetail);



module.exports = router;
