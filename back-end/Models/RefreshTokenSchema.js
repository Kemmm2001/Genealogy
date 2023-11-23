const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    accountID: {
        type: Number,
        required: true,
    },
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

const saveRefreshToken = async (accountID, token) => {
    try {
        const refreshToken = new RefreshToken({ accountID, token });
        await refreshToken.save();
        console.log('Refresh token đã được lưu vào MongoDB.');
    } catch (error) {
        console.error('Lỗi khi lưu refresh token:', error.message);
        throw error;
    }
};

module.exports = { RefreshToken, saveRefreshToken };
