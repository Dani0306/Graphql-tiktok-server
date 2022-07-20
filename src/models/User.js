import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username: String, 
    email: String, 
    profile: String, 
    followers: [], 
    following: []
})

const User = mongoose.model('User', userSchema)

export default User