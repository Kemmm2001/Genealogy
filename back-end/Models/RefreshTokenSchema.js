const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1d' }, // Hết hạn sau 1 ngày
    },
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

const saveRefreshToken = async (token) => {
    try {
        const refreshToken = new RefreshToken({ token });
        await refreshToken.save();
        console.log('Refresh token đã được lưu vào MongoDB.');
    } catch (error) {
        console.error('Lỗi khi lưu refresh token:', error.message);
        throw error;
    }
};

module.exports = { RefreshToken, saveRefreshToken };
