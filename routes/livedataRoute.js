const router = require("express").Router();
const livedataController = require('../controllers/livedataController');

router.post('/livedata', livedataController.post_live_data)
router.get('/livedata', livedataController.get_live_data)
router.put('/livedata/:_id', livedataController.update_live_data)

module.exports = router