const router = require("express").Router();

const suggestionController = require('../controllers/SuggestionController')

router.get('/suggestions', suggestionController.get_suggestions)
router.get('/suggestion/:_id', suggestionController.get_suggestion)
router.post('/suggestion', suggestionController.post_suggestion)

module.exports = router