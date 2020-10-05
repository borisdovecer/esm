var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET production page. */
router.get('/production', function (req, res, next) {
  res.render('production', { title: 'Production'})
});
/* GET about-us page. */
router.get('/about-us', function (req, res, next) {
  res.render('about', { title: 'About'})
});
/* GET contact page. */
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact'})
});
/* GET hseq page. */
router.get('/hseq', function (req, res, next) {
  res.render('hesq', { title: 'HSEQ'})
});
/* GET news list page. */
router.get('/news', function (req, res, next) {
  res.render('newslist', { title: 'Company news'})
});
/* GET news details page. */
router.get('/news/:slug', function (req, res, next) {
  res.render('newsdetails', { title: 'Company news'})
});
/* GET support system page. */
router.get('/strut-support-systems', function (req, res, next) {
  res.render('supportsystem', { title: 'Support sistem'})
});
/* GET instrument suppotr page. */
router.get('/instrument-support', function (req, res, next) {
  res.render('instrumentsupport', { title: 'Instrument support'})
});
/* GET modules page. */
router.get('/modules-and-framing', function (req, res, next) {
  res.render('modulesandframing.ejs', { title: 'Modules and framing'})
});
/* GET stairways and platforms page. */
router.get('/stairways-and-platforms', function (req, res, next) {
  res.render('stairwaysandplatforms', { title: 'HESQ'})
});
/* GET surfice treatment page. */
router.get('/surface-treatment', function (req, res, next) {
  res.render('surfacetreatment', { title: 'Surface treatment'})
});
/* GET download page. */
router.get('/company-downloads', function (req, res, next) {
  res.render('companydownloads', { title: 'Company documents'})
});
/* GET certification page. */
router.get('/company-certificates', function (req, res, next) {
  res.render('companycertificates', { title: 'Company certificates'})
});

module.exports = router;
