import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    video: String, 
    comments: [{
        owner: String,
        content: String, 
        createdAt: String
    }], 
    owner: {
        username: String,
            email: String,
            password: String,
            profile: String,
            followers: [],
            following: []
    }, 
    likes: [], 
    title: String, 
    description: String, 
    tags: [String]

})


const Post = mongoose.model('Post', postSchema)

export default Post