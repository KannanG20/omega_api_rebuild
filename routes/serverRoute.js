const router = require("express").Router();

const serverController = require('../controllers/ServerController')

router.get('/servers', serverController.get_servers)
router.put('/server/:_id', serverController.update_servers)
router.post('/server', serverController.post_server)

module.exports = router