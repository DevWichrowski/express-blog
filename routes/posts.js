const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');


const postsController = require("../controllers/posts");


router.get('/', postsController.get_posts);

router.get('/related-posts', postsController.get_related_posts);

router.post('/add', auth, postsController.post_post);

router.get('/:id', postsController.get_specific_post);

router.delete('/:id', postsController.delete_post);

router.patch('/:id', postsController.patch_post);


module.exports = router;