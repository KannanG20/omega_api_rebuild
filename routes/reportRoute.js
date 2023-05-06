const router = require("express").Router();

const reportController = require('../controllers/ReportController')
const checkApi = require('../middlewares/CheckApiKey')


router.get('/reports', checkApi, reportController.get_reports)
router.get('/report/:_id', checkApi, reportController.get_report)
router.post('/report', checkApi, reportController.post_report)

module.exports = router