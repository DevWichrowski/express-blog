const User = require('../models/User');

exports.get_users = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        return res.status(404).send({error: 'Users not found'})
    }
};

exports.post_user = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token})
    } catch (error) {
        return res.status(400).send({error: 'Bad request to the server'});
    }
};

exports.get_specific_user = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (error) {
        return res.status(404).send({error: 'User not found'})
    }
};

exports.delete_user = async (req, res) => {
    try {
        const user = await User.deleteOne({_id: req.params.id})
        res.json(user);
    } catch (error) {
        return res.status(400).send({error: 'User not found or bad request'})
    }
};

exports.update_user = async (req, res) => {
    try {
        const updatedPost = await User.updateOne({_id: req.params.id}, {$set: req.body});
        res.json(updatedPost);
    } catch (error) {
        return res.status(400).send({error: 'User not found or bad request'})
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
        // res.send({user, token})
        res.send({token})
    } catch (error) {
        res.status(400).send({error: 'Bad request'});
    }
};

exports.get_user_me = async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        res.status(401).send({error: 'Unauthorized'});
    }
};

exports.user_logout = async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        });
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
};

exports.user_logout_all = async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save();
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
};