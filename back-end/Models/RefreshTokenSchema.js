const mongoose = require('mongoose');
const moment = require('moment');

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
        default: () => moment().utcOffset(7 * 60).add(1, 'minute').toDate(), // Lưu thời gian hết hạn theo múi giờ UTC+7
        index: { expires: 60 }, // Sử dụng expires với đơn vị là giây
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