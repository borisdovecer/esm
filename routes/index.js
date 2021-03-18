const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../config/auth');

const userController = require('../controllers/userController')
const newsController = require('../controllers/newsController')
const contactController = require('../controllers/contactController')
const aboutController = require('../controllers/aboutController')
const prodController = require('../controllers/prodController')
const productController = require('../controllers/productController')
const downloadController = require('../controllers/downloadController')

global.prodItems = []
prodController.get_prod()

/* GET home page. */
router.get('/', aboutController.get_index);
/* GET production page. */
router.get('/production', prodController.get_production);
router.get('/production/:slug', prodController.get_production_details)
/* GET products page. */
router.get('/products', productController.get_products);
router.get('/products/:slug', productController.get_product_details)
/* GET about-us page. */
router.get('/about-us', aboutController.get_about);
router.get('/contact', contactController.get_contact);
/* GET hseq page. */
router.get('/hseq',  aboutController.get_hesq);
/* GET news list page. */
router.get('/news', newsController.get_news_list);
router.get('/news/:slug', newsController.get_news_details);
/* GET download page. */
router.get('/company-downloads', downloadController.get_downloads);
router.get('/company-certificates', downloadController.get_certificates);
/* User Auth */
router.get('/login',  userController.get_login);
router.get('/register', userController.get_register);
router.post('/register', userController.post_register)
router.post('/login', userController.post_login);
router.get('/logout', userController.post_logout);


router.get('/comingsoon', aboutController.get_comingsoon);

module.exports = router;
