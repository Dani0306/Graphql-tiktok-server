import { UserInputError } from 'apollo-server'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config.js'
import { checkAuth } from '../checkAuth.js'


const generateToken = user => {
    return jwt.sign({
        id: user._id, 
        email: user.email, 
        username: user.username
    }, SECRET, { expiresIn: '1h' })
}

export const usersResolvers = {
    Query: {
        getUsers: async () => {
            const users = await User.find()
            return users
        }, 

        getUser: async (_, {}, context) => {
            const { username } = checkAuth(context);
            const user = await User.findOne({ username });
            return user

        }
    }, 
    Mutation: {
        register: async (_, { registerInput: { username, email, profile }}) => {
            const foundUser = await User.findOne({ email })
            if(foundUser) throw new UserInputError('This email address is already related to another account, please try signin in.');

            const newUser = new User({
                username, email, profile
            })

            const user = await newUser.save();

            const token = generateToken(user);
            return {
                ...user._doc, 
                token
            }
        }, 
        
        login: async (_, { email }) => {
            const user = await User.findOne({ email });
            if(!user) throw new UserInputError('This email address is not related to any account, please try singin up.');
            const token = generateToken(user);

            return {
                ...user._doc, 
                token
            }

        }, 

        deleteUsers: async () => {
            const users = await User.deleteMany();

            if(users) return 'users deleted'
        }
    }
}