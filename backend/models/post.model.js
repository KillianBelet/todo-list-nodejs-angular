const mongoose = require("mongoose");


// Define the Post schema
const postSchema = new mongoose.Schema({
 message: {
 type: String,
 required: true,
 },
 author: {
    type: String,
    required: true,
 },
 likers: {
    type: [String],
 }
},
 {
    timestamps: true
 }
);

// Create the Post model from the schema
const Post = mongoose.model('post', postSchema);
module.exports = Post;