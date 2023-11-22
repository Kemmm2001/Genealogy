const mongoose = require('mongoose')
const schema = mongoose.Schema

const RefreshTokenSchema = new schema({
    token:{
        type: String,
        required: true,
        unique: true
    },
    exprireTime:{
        type: Date
    }
})

const Refresh = mongoose.model('refresh', RefreshTokenSchema)
module.exports = Refresh
