const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({email, password: hashedPassword});

        res.status(201).json({message: 'User created successfully', userId: user._id});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
};

exports.login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: 'Invalid credentials'});

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({message: 'Invalid password'});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({
            token, 
            user: {
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
};