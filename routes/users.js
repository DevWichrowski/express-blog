const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const usersController = require('../controllers/users');

router.get('/', usersController.get_users);

router.post('/', usersController.post_user);

router.get('/me', auth, usersController.get_user_me);

router.get('/:id', usersController.get_specific_user);

router.delete('/:id', usersController.delete_user);

router.patch('/:id', usersController.update_user);

// router('/register');

router.post('/login', usersController.user_login);


// router('/logout');

// router('/logoutall');

module.exports = router;