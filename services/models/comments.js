var mongoose = require("mongoose");

const Comment = mongoose.model('comments', {
    post_id: String,
    publish_date: Date,
    likes: [
        { 
            id: String, 
            handle: String 
        }
    ],
    comment: String,
    user: {
        id: String,
        handle: String,
        avatar: String
    },
    deleted: Boolean
});