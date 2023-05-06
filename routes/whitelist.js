const router = require("express").Router();

const whitelistController = require("../controllers/whitelistController")
const checkApi = require('../middlewares/CheckApiKey')


router.post('/whitelist', checkApi, whitelistController.POST_WHITELIST);
router.get('/whitelists', checkApi, whitelistController.GET_WHITELISTS);
router.put('/whitelist/:_id', checkApi, whitelistController.UPDATE_WHITELIST)
router.delete('/whitelist/:_id', checkApi, whitelistController.DELETE_WHITELIST)

module.exports =router