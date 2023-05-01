const router = require("express").Router();

const userController = require("../controllers/userController")

// post Single User
router.post('/register', userController.post_user_registration);
router.post('/login',  userController.post_user_login);

// Get All Users
router.get('/users', userController.get_users);

// Get Single User
router.get('/user/:_id', userController.get_single_user);

// Update Single User
router.put('/user/:_id', userController.update_user);
router.delete('/user/:_id', userController.delete_user)

module.exports = router;



