const otpModel = require("../models/otpModel");
const userModel = require("../models/userModel");
const crypto = require("crypto")
const transporter = require("../utils/nodemailer")

const otpController = async(req, res) => {
    res.send("Hello, I am OTP")
}

const otpGenerateController = async (req, res) => {
    try {
        const { userId } = req;
        // console.log("userId", userId);

        // Ensure userId is available and valid
        if (!userId) {
            return res.status(401).send({ message: "Unauthorized", success: false });
        }

        // Attempt to find the user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found", success: false });
        }

        // Generate OTP logic
        const otp = crypto.randomInt(100000, 999999).toString();
        const createAt = new Date();
        const expireAt = new Date(createAt.getTime() + 5 * 60 * 1000);

        const mailOptions = {
            from: "pavankumarkuruva529@gmail.com",
            to: user.email,
            subject: "The Personal-Expense-Tracker App",
            text: `Dear ${user.name},

            ${otp} is your one time password (OTP).
            Hey this is a personal-expense-tracker app

            Please enter the OTP to proceed. OTP valid for 5min
            Do not share your otp with anyone.
            
            Thank you
            Team Pavan Kumar` 
        }
        let isCreated = await otpModel.findOne({ userId });
        if (isCreated) {
            let now = new Date();
            let prevCreatedAt = isCreated.createAt;
            if (now - prevCreatedAt < 30000) {
                return res.status(400).send({ message: "Wait for 30 sec before creating new OTP", success: false });
            } 
            else {
                await transporter.sendMail(mailOptions)
                await otpModel.updateOne({ userId }, {
                    $set: {
                        otp,
                        createAt,
                        expireAt
                    }
                });
                return res.status(200).send({ message: "OTP sent to the user email", success: true });
            }
        } 
        else {
            const otpData = new otpModel({ userId: user._id, otp, createAt, expireAt });
            // await otpData.save();
            // await transporter.sendMail(mailOptions);
            await Promise.all([ transporter.sendMail(mailOptions), otpData.save() ])
            return res.status(200).send({ message: "OTP sent to the user email", success: true });
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal Server Error", success: false });
    }
};


const otpVerifyController = async(req, res) => {
    // return res.send("Hello, I am Verify OTP")
    try {
        const userId = req.userId
        const user = await userModel.findById(userId)
        if(!user) {
            res.status(404).send({ message: "User not Found", success: false})
        }
        else {
            const userOtpId = user._id
            const otpData = await otpModel.findOne(({ userId: userOtpId }))
            const now = new Date()
            if(now > otpData.expireAt) {
                res.status(400).send({ message: "OTP is expired, Generate again", success: false})
            }
            else {
                const { userOtp } = req.body
                if(userOtp === otpData.otp) {
                    res.status(200).send({ message: "OTP is verified Successfully", success: true})
                }
                else {
                    res.status(400).send({ message: "OTP is not matching, Try again", success: false})
                }
            }
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({ message: "Internal Server Error", success: false})
    }
}



module.exports = { otpController, otpGenerateController, otpVerifyController }