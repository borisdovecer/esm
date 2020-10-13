var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Serial production of metal parts and components :: European Strut & Support Manufacturer',
    description: 'ESM is a European manufacturer and fabricator of metal Strut Supports and Fastening products for wholesalers.'
  });
});
/* GET production page. */
router.get('/production', function (req, res, next) {
  res.render('production', {
    title: 'Metal parts and components production :: European Strut & Support Manufacturer',
    description: 'Our company manufactures support systems, instruments supports, modules & framing, metal stairways & platforms and offers surface treatment as well.'
  })
});
/* GET about-us page. */
router.get('/about-us', function (req, res, next) {
  res.render('about', {
    title: 'Metal parts and components manufacturer :: European Strut & Support Manufacturer',
    description: 'ESM offers serial production of metal parts and components. Competitive prices while maintaining high standards of European quality.'
  })
});
/* GET contact page. */
router.get('/contact', function (req, res, next) {
  res.render('contact', {
    title: 'Contact Us :: European Strut & Support Manufacturer',
    description: 'Please feel free to contact us for any of your inquiries and questions.'
  })
});
/* GET hseq page. */
router.get('/hseq', function (req, res, next) {
  res.render('hesq', {
    title: 'HSEQ :: European Strut & Support Manufacturer',
    description: 'Through the production activity, we continuously take care of health, safety, environment, and quality (HSEQ). We are aware of our responsibility towards everyone involved in the production process and towards the environment whose resources we responsibly use.'
  })
});
/* GET news list page. */
router.get('/news', function (req, res, next) {
  res.render('newslist', {
    title: 'Company news :: European Strut & Support Manufacturer',
    description: 'News'
  })
});
/* GET news details page. */
router.get('/news/:slug', function (req, res, next) {
  res.render('newsdetails', {
    title: 'Company news :: European Strut & Support Manufacturer',
    description: 'News'
  })
});
/* GET support system page. */
router.get('/strut-support-systems', function (req, res, next) {
  res.render('supportsystem', {
    title: 'Strut Support Systems :: European Strut & Support Manufacturer',
    description: 'We manufacture C channels, cantilever arms, angle and connection brackets, post bases, and beam clamps.'
  })
});
/* GET instrument suppotr page. */
router.get('/instrument-support', function (req, res, next) {
  res.render('instrumentsupport', {
    title: 'Instrument Supports :: European Strut & Support Manufacturer',
    description: 'If you need a floor stand, wall mount stand, pipe & cable mount stand ESM manufactures all different kinds of instrument stands.'
  })
});
/* GET modules page. */
router.get('/modules-and-framing', function (req, res, next) {
  res.render('modulesandframing.ejs', {
    title: 'Modular Framing & Assembling :: European Strut & Support Manufacturer',
    description: 'Modular framing and assembling is an integral part of the ESM offer. Prefabricated module solutions will increase project efficiency and eliminate the time spent waiting for materials.'
  })
});
/* GET stairways and platforms page. */
router.get('/stairways-and-platforms', function (req, res, next) {
  res.render('stairwaysandplatforms', {
    title: 'Metal Stairways & Platforms :: European Strut & Support Manufacturer',
    description: 'Metal stairways and platforms - dock ladders, industrial stairs, handrail systems, gangways, boat landing - ESM has the capability for serial manufacturing of tailor-made access equipment.'
  })
});
/* GET surfice treatment page. */
router.get('/surface-treatment', function (req, res, next) {
  res.render('surfacetreatment', {
    title: 'Surface Treatment :: European Strut & Support Manufacturer',
    description: 'Powder coating, sandblasting and coating, hot-dip galvanizing, and electro galvanization - ESM provides a complete service to its clients and offers surface treatments with the help of carefully selected associates.'
  })
});
/* GET download page. */
router.get('/company-downloads', function (req, res, next) {
  res.render('companydownloads', {
    title: 'Company documents :: European Strut & Support Manufacturer',
    description: 'Company documents'
  })
});
/* GET certification page. */
router.get('/company-certificates', function (req, res, next) {
  res.render('companycertificates', {
    title: 'Company certificates :: European Strut & Support Manufacturer',
    description: 'All certificates are valid for ESM, since certifications are tied to our company registration code.'
  })
});

module.exports = router;
