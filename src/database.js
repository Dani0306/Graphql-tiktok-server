import mongoose from 'mongoose'

export const connectDatabase = () => mongoose.connect('mongodb://localhost:27017/tiktoklazyloading').then(() => console.log('database connected'))


export default connectDatabase