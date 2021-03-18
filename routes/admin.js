const express = require('express');
const router = express.Router();
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

const newsController = require('../controllers/newsController')
const contactController = require('../controllers/contactController')
const imageController = require("../controllers/imageController")
const aboutContoller = require('../controllers/aboutController')
const prodController = require('../controllers/prodController')
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const downloadController = require('../controllers/downloadController')

router.get('/',ensureAuthenticated, (req,res) => { res.redirect("/admin/news")  }) // admin dashboard

// News
router.get('/news',ensureAuthenticated, newsController.get_news_list_admin) // News list admin
router.get('/news/update/:id',ensureAuthenticated, newsController.get_news_update) // get update
router.get('/news/create',ensureAuthenticated, newsController.get_create_news) // get create
router.post('/news/create',ensureAuthenticated, newsController.post_create_news) // post create
router.post('/news/update/:id',ensureAuthenticated, newsController.post_update_news) // post update
router.post('/news/delete/:id',ensureAuthenticated, newsController.post_delete_news) // post delete

// Contact
router.get('/contact',ensureAuthenticated, contactController.get_contact_list) // List [R]
router.get('/contact/update/:id',ensureAuthenticated, contactController.get_contact_update) // Get Update [R]
router.get('/contact/create',ensureAuthenticated, contactController.get_create_contact) // get Create
router.post('/contact/create',ensureAuthenticated, contactController.post_create_contact) // post Create [C]
router.post('/contact/update/:id',ensureAuthenticated, contactController.post_update_contact) // post Update [U]
router.post('/contact/delete/:id',ensureAuthenticated, contactController.post_delete_contact) // post Delete [D]

// Images
router.get('/images',ensureAuthenticated, imageController.get_image_list) // GET List [R]
router.post('/images/create',ensureAuthenticated, imageController.post_create_image) // POST upload image [C]
router.post('/images/delete/:id',ensureAuthenticated, imageController.post_delete_image) // POST Delete [D]

// About
router.get('/about',ensureAuthenticated, aboutContoller.get_about_list) // GET list [R]
router.get('/about/create',ensureAuthenticated, aboutContoller.get_create_about) // GET Create
router.get('/about/update/:id',ensureAuthenticated, aboutContoller.get_about_update) // GET Update [R]
router.post('/about/create',ensureAuthenticated, aboutContoller.post_create_about) // Post Create [C]
router.post('/about/update/:id',ensureAuthenticated, aboutContoller.post_update_about) // POST Update [U]
router.post('/about/delete/:id',ensureAuthenticated, aboutContoller.post_delete_about) // POST Delete [D]

// Production
router.get('/production',ensureAuthenticated, prodController.get_production_list) // GET list [R]
router.get('/production/create',ensureAuthenticated, prodController.get_create_production) // GET Create
router.get('/production/update/:id',ensureAuthenticated, prodController.get_production_update) // GET Update [R]
router.post('/production/create',ensureAuthenticated, prodController.post_create_production) // Post Create [C]
router.post('/production/update/:id',ensureAuthenticated, prodController.post_update_production) // POST Update [U]
router.post('/production/delete/:id',ensureAuthenticated, prodController.post_delete_production) // POST Delete [D]

// Products
router.get('/products',ensureAuthenticated, productController.get_product_list) // GET list [R]
router.get('/products/create',ensureAuthenticated, productController.get_create_product) // GET Create
router.get('/products/update/:id',ensureAuthenticated, productController.get_product_update) // GET Update [R]
router.post('/products/create',ensureAuthenticated, productController.post_create_product) // Post Create [C]
router.post('/products/update/:id',ensureAuthenticated, productController.post_update_product) // POST Update [U]
router.post('/products/delete/:id',ensureAuthenticated, productController.post_delete_product) // POST Delete [D]

// Users
router.get('/users', userController.get_user_list) // GET user list
router.get('/users/create', userController.get_register) // GET Create
router.post('/users/create', userController.post_register) // Post Create [C]
router.get('/users/update/:id', userController.get_user_update) // GET Update [R]
router.post('/users/update/:id', userController.post_update_user) // POST Update [U]
router.post('/users/delete/:id',ensureAuthenticated, userController.post_delete_user) // POST Delete [D]

// Downloads and Certificates
router.get('/downloads',ensureAuthenticated, downloadController.get_download_list) // GET user list
router.get('/downloads/create',ensureAuthenticated, downloadController.get_create_download) // GET Create
router.post('/downloads/create',ensureAuthenticated, downloadController.post_create_download) // Post Create [C]
router.get('/downloads/update/:id',ensureAuthenticated, downloadController.get_download_update) // GET Update [R]
router.post('/downloads/update/:id',ensureAuthenticated, downloadController.post_update_download) // POST Update [U]
router.post('/downloads/delete/:id',ensureAuthenticated, downloadController.post_delete_download) // POST Delete [D]
module.exports = router;
