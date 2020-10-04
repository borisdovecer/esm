var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/production', function (req, res, next) {
  res.render('production', { title: 'Production'})
});

router.get('/about-us', function (req, res, next) {
  res.render('about', { title: 'About'})
});

router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact'})
});

router.get('/hseq', function (req, res, next) {
  res.render('hesq', { title: 'HSEQ'})
});

router.get('/strut-support-systems', function (req, res, next) {
  res.render('supportsystem', { title: 'Support sistem'})
});

router.get('/instrument-support', function (req, res, next) {
  res.render('instrumentsupport', { title: 'Instrument support'})
});

router.get('/modules-and-framing', function (req, res, next) {
  res.render('modulesandframing.ejs', { title: 'Modules and framing'})
});

router.get('/stairways-and-platforms', function (req, res, next) {
  res.render('stairwaysandplatforms', { title: 'HESQ'})
});

router.get('/surface-treatment', function (req, res, next) {
  res.render('surfacetreatment', { title: 'Surface treatment'})
});

router.get('/company-downloads', function (req, res, next) {
  res.render('companydownloads', { title: 'Company documents'})
});

router.get('/company-certificates', function (req, res, next) {
  res.render('companycertificates', { title: 'Company certificates'})
});

module.exports = router;
