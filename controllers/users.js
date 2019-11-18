const User = require('../models/User');

exports.get_users = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users);
    } catch (error) {
        res.json({error})
    }
};

exports.post_user = async (req, res) => {
    const user = new User({
            login: req.body.login,
            email: req.body.email,
            password: req.body.password
        }
    );

    try {
        const newUser = await user.save();
        res.json(newUser);
    } catch (error) {
        res.json({error})
    }
};

exports.get_specific_user = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (error) {
        res.json({erro})
    }
};

exports.delete_user = async (req, res) => {
    try {
        const user = await User.deleteOne({_id: req.params.id})
        res.json(user);
    } catch (error) {
        res.json({error})
    }
};

exports.update_user = async (req, res) => {
    try {
        const updatedPost = await User.updateOne({_id: req.params.id}, {$set: req.body});
        res.json(updatedPost);
    } catch (error) {
        res.json({error})
    }
};