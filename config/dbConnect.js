const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

console.log(`DB_URL: ${process.env.DB_URL}`);
console.log(`DB_NAME: ${process.env.DB_NAME}`);


const url =  `${process.env.DB_URL}/${process.env.DB_NAME}`

const dbConnect = async() => {
    try {
        await mongoose.connect(url)
        console.log("Database is connected");
    }
    catch(error) {
        console.log(error.message);
    }
}

module.exports = dbConnect