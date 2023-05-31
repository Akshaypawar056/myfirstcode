const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    
    },
    password: {
        type: String,
        required: true
    }
});
        module.exports = Users1 = mongoose.model('user1', UsersSchema);