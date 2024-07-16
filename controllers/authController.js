const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken")
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

const loginController = async(req, res) => {
    // res.send("Login Successfully")
    const { email, password } = req.body
    try {
        const existingUser = await userModel.findOne({email})
        if(!email || !password) {
            return res.status(400).send({ message: "Please enter email and password", success: false })
        }
        if(existingUser) {
            const isMatched = await bcrypt.compare(password, existingUser.password);
            // console.log(isMatched);
            if(!isMatched) {
                return res.status(400).send("Passwords are not matching")
            }
            else {
                let token = jwt.sign(existingUser._id.toString(), "Pranavi")
                return res.status(200).send({ token })
            }
        }
        else{
            res.status(400).send({ message: "User Not Found, Please Register", success: false })
        }
    }
    catch(error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error", success: false })
    }
}

module.exports = { registerController, loginController };
