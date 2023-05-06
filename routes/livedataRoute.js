const router = require("express").Router();
const livedataController = require('../controllers/livedataController');
const checkApi = require('../middlewares/CheckApiKey')


router.post('/livedata', checkApi, livedataController.post_live_data)
router.get('/livedata', checkApi, livedataController.get_live_data)
router.put('/livedata/:_id', checkApi, livedataController.update_live_data)

module.exports = router