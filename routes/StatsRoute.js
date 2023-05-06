const router = require("express").Router();

const statsController = require("../controllers/Stats")
const checkApi = require('../middlewares/CheckApiKey')


router.post('/stats', checkApi, statsController.post_stats)
router.get('/stats', checkApi, statsController.get_stats)

module.exports = router