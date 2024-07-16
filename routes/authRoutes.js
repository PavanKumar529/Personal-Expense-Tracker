const express = require('express');
const { registerController, loginController, getUserController, deleteUserController, updateUserController } = require('../controllers/authController');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');

const userRouter = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// User registration route with file upload middleware
userRouter.post('/register', upload.single('image'), registerController);
userRouter.post("/login", loginController)

// User details access 
userRouter.get("/get-user", authMiddleware, getUserController)
userRouter.post("/update-user", authMiddleware, updateUserController)
userRouter.post("/delete-user", authMiddleware, deleteUserController)

module.exports = userRouter;
