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
    // const user = new User({
    //         login: req.body.login,
    //         email: req.body.email,
    //         password: req.body.password
    //     }
    // );
    //
    // try {
    //     const newUser = await user.save();
    //     res.json(newUser);
    // } catch (error) {
    //     res.json({error})
    // }
    try {
        const user = new User(req.body)
        console.log('req body', req.body);
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
        console.log('error', error)
    }
};

exports.get_specific_user = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (error) {
        res.json({error})
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

exports.user_login = async (req, res) => {
    //Login a registered user
    try {
        const {login, password} = req.body;
        console.log('req body', req.body)
        const user = await User.findByCredentials(login, password);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken();
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error);
        console.log('error', error)
    }
};

exports.get_user_me = async (req, res) => {
    res.send(req.user)
};