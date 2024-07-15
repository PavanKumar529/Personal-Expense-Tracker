const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const registerController = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword, tc } = req.body;
        const { filename: image } = req.file;

        if (!name || !email || !password || !confirmPassword || !image || !tc) {
            return res.status(400).send({ message: "All fields are required", success: false });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists, please login", success: false });
        }

        if (password !== confirmPassword) {
            return res.status(400).send({ message: "Passwords do not match", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            image,
            tc
        });

        await newUser.save();

        res.status(201).send({ message: "Registration successful", success: true });
    } catch (error) {
        console.error("Error in registerController:", error);
        next(error);
    }
};

module.exports = { registerController };
