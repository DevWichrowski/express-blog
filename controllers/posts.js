const Post = require('../models/Post');
const User = require('../models/User');


exports.get_posts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'login');

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
        tags: req.body.tags
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        return res.status(400).send({error: 'Bad request'})
    }
};

exports.get_specific_post = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'login');
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
