const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: String,
        required: true
    
    },
    mobile: {
        type: String,
        required: true
    },
    add: {
        type: [String],
        required: true
    },
    desc: {
        type: String
        
    },
    githubusername: {
        type: String        
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }

        }
    ],
    education: [
        {
          school: {
                type: String,
                required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldofstudy: {
            type: String,
            required: true
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
            
        },
        current: {
            type: Boolean,
            required: false
        },
        description: {
            type: String
        }
    }
            
    ],
    social: {
    youtube: {
        type: String
    },
    twitter: {
        type: String
    },
    facebook: {
        type: String
    },
    linkedin: {
        type: String
    },
    instagram: {
        type: String
    }
},


Date: {
    type: Date,
    default: Date.now
},
basicinfo: [
    {
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
    }
]    

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);