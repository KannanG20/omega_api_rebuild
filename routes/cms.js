const router = require("express").Router();

const cmsController = require("../controllers/cmsController")

// CMS for Terms and conditions
router.get('/terms-and-conditions', cmsController.get_terms_and_conditions);
router.put('/terms-and-conditions/:_id', cmsController.put_terms_and_conditions);

// CMS for About Us
router.get('/about-us', cmsController.get_about_us);
router.put('/about-us/:_id', cmsController.put_about_us);

// CMS for Data Protection
router.get('/data-protection', cmsController.get_data_protection);
router.put('/data-protection/:_id', cmsController.put_data_protection);

// CMS for Privacy Policy
router.get('/privacy-policy', cmsController.get_privacy_policy);
router.put('/privacy-policy/:_id', cmsController.put_privacy_policy);

module.exports = router;