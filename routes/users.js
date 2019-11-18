const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.get_users);

router.post('/', usersController.post_user);

router.get('/:id', usersController.get_specific_user);

router.delete('/:id', usersController.delete_user);

router.patch('/:id', usersController.update_user);

module.exports = router;