
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: String,
  expiresAt: Date,
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
