const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user1'
    },
   
    
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
    
    },
    mobile: {
        type: Number,
        
    },
    work: {
        type: String,
        
    },
    add: {
        type: String,
        
    },
    desc: {
        type: String,

    },
    date: {
        type: Date,
        default: Date.now
    
    }
});

module.exports = User = mongoose.model('user1', UserSchema);
