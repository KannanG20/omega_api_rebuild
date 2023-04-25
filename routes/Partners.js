const router = require("express").Router();
const multer = require("multer")
const upload = multer({ dest: "uploads/" })
const partnerController = require("../controllers/partnerController")

router.post('/partner', upload.single('image'), partnerController.POST_IMAGE)
router.get('/partners', partnerController.GET_IMAGES);
router.delete('/partner/:_id', partnerController.DELETE_IMAGE)

module.exports = router