const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const usersController = require('../controllers/users');

router.get('/', usersController.get_users);

router.get('/me', auth, usersController.get_user_me);

router.get('/:id', usersController.get_specific_user);

router.delete('/:id', usersController.delete_user);

router.patch('/:id', usersController.update_user);

router.post('/register', usersController.post_user);

router.post('/login', usersController.user_login);

router.post('/me/logout', auth, usersController.user_logout);

router.post('/me/logoutall', auth, usersController.user_logout_all);

module.exports = router;