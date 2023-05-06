const router = require("express").Router();

const userController = require("../controllers/userController")
const checkApi = require('../middlewares/CheckApiKey')

// post Single User
router.post('/register', checkApi, userController.post_user_registration);
router.post('/login', checkApi,  userController.post_user_login);

// Get All Users
router.get('/users', checkApi, userController.get_users);

// Get Single User
router.get('/user/:_id', checkApi, userController.get_single_user);

// Update Single User
router.put('/user/:_id', checkApi, userController.update_user);
router.delete('/user/:_id', checkApi, userController.delete_user)

module.exports = router;



