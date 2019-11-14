const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const {put_post} = require("../controllers/posts");
const {patch_post} = require("../controllers/posts");
const {delete_post} = require("../controllers/posts");
const {get_specific_post} = require("../controllers/posts");
const {post_post} = require("../controllers/posts");
const {get_posts} = require("../controllers/posts");


router.get('/', get_posts);

router.post('/', post_post);

router.get('/:id', get_specific_post);

router.delete('/:id', delete_post);

router.patch('/:id', patch_post);

// router.patch('/:id', put_post);


module.exports = router;