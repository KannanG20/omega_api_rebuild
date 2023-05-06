const router = require("express").Router();

const serverController = require('../controllers/ServerController')
const checkApi = require('../middlewares/CheckApiKey')

router.get('/servers', checkApi, serverController.get_servers)
router.put('/server/:_id', checkApi, serverController.update_servers)
router.post('/server', checkApi, serverController.post_server)

module.exports = router