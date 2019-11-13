const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// /posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({message: error})
    }
});

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const savedPost = await post.save()
        res.json(savedPost);
    } catch (error) {
        res.json({message: error})
    }
});

// GET SPECIFIC POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post)
    } catch (error) {
        res.json({error})
    }
});

// DELETE POST
router.delete('/:id', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({_id: req.params.id});
        res.json(removedPost);
    } catch (error) {
        res.json({error})
    }
});


// UPDATE POST
router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({_id: req.params.id}, {$set: {title: req.body.title}});
        res.json(updatedPost);
    } catch (error) {
        res.json({error})
    }
});


module.exports = router;