const router = require("express").Router();

const suggestionController = require('../controllers/SuggestionController')
const checkApi = require('../middlewares/CheckApiKey')
  

router.get('/suggestions', checkApi ,suggestionController.get_suggestions)
router.get('/suggestion/:_id', checkApi ,suggestionController.get_suggestion)
router.post('/suggestion', checkApi ,suggestionController.post_suggestion)

module.exports = router