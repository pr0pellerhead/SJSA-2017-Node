var mongoose = require("mongoose");

const Post = mongoose.model('posts', {
    user: {
        id: String,
        handle: String,
        avatar: String
    },
    description: String,
    tags: [{type: String}],
    picture: String,
    publish_date: Date,
    deleted: Boolean,
    likes: [
        { 
            id: String, 
            handle: String 
        }
    ]
});