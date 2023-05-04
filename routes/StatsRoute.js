const router = require("express").Router();

const statsController = require("../controllers/Stats")

router.post('/stats', statsController.post_stats)
router.get('/stats', statsController.get_stats)

module.exports = router