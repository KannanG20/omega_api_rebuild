const router = require("express").Router();

const reportController = require('../controllers/ReportController')

router.get('/reports', reportController.get_reports)
router.get('/report/:_id', reportController.get_report)
router.post('/report', reportController.post_report)

module.exports = router