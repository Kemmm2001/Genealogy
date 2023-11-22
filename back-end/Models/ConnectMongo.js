const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://tanhatanh76:3EyJL0rTTXFHEUWf@cluster0.fg0f0hz.mongodb.net/capstone_project?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Kết nối db thành công");
    } catch (error) {
        console.log("Lỗi kết nối database:", error.message);
    }
}

module.exports = connectDB;
