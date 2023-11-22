const mongoose = require ("mongoose")
const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://tanhatanh76:3EyJL0rTTXFHEUWf@cluster0.fg0f0hz.mongodb.net/capstone_project?retryWrites=true&w=majority")
        console. log("kết nối db thành công");
    } catch (error) {
        console.log(error.consolemessage);
    }
}

module.exports = connectDB;