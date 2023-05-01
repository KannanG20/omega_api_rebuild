const router = require("express").Router();

const whitelistController = require("../controllers/whitelistController")


router.post('/whitelist', whitelistController.POST_WHITELIST);
router.get('/whitelists', whitelistController.GET_WHITELISTS);
router.put('/whitelist/:_id', whitelistController.UPDATE_WHITELIST)
router.delete('/whitelist/:_id', whitelistController.DELETE_WHITELIST)

module.exports =router