const Post = require('../models/Post');
const User = require('../models/User');

const utils = require('../utils/helpers');

exports.get_posts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'nickname');

        res.json(posts);
    } catch (error) {
        return res.status(404).send({error: 'Posts not found'})
    }
};

exports.post_post = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        content: req.body.content,
        readTime: req.body.content ? utils.calculateReadTime(req.body.content) : 0,
    });

    try {
        const savedPost = await post.save();
        res.send(savedPost);
    } catch (error) {
        return res.status(400).send({error: 'Bad request'})
    }
};

exports.get_specific_post = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id).populate('user', 'nickname');
        post.views += 1;
        await post.save();
        res.send(post)
    } catch (error) {
        return res.status(404).send({error: 'Post not found'})
    }
};

exports.delete_post = async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({_id: req.params.id});
        res.json(removedPost);
    } catch (error) {
        return res.status(404).send({error: 'Post not found'})
    }
};

// Patch a specyfic field
exports.patch_post = async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({_id: req.params.id}, {$set: req.body});
        res.json(updatedPost);
    } catch (error) {
        return res.status(404).send({error: 'Post not found'})
    }
};

exports.get_related_posts = async (req, res) => {
    try {
        const posts = await Post.find({ 'tags.value' : 'react'});
        console.log('posts', posts);
        res.json(posts);
    } catch (error) {
        return res.status(404).send({error: 'Posts not found'})
    }
};