const mysql = require('mysql2');
const mongoose = require("mongoose");

const connection = mysql.createConnection({
  host: '14.225.254.123',
  user: 'admin',
  password: 'AXeTFQW7pC3cxSFg9a7Q8JfwtXkMmy3PSbnG2NgLXASbWhps6x9dBLG',
  database: 'genealogy'
});

// Kết nối vào cơ sở dữ liệu
connection.connect(function (err) {
  if (err) {
    console.error('Lỗi kết nối:', err);
  } else {
    console.log('Kết nối thành công vào cơ sở dữ liệu MySQL');
  }
});
// const connectDB = async () => {
//   try {
//       await mongoose.connect("mongodb+srv://tanhatanh76:3EyJL0rTTXFHEUWf@cluster0.fg0f0hz.mongodb.net/capstone_project?retryWrites=true&w=majority", {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//       });
//       console.log("Kết nối mongodb thành công");
//   } catch (error) {
//       console.log("Lỗi kết nối database:", error.message);
//   }
// }
// connectDB()
module.exports = { connection };
