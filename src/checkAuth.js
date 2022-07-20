import jwt from 'jsonwebtoken'
import { SECRET } from './config.js'
import { AuthenticationError } from 'apollo-server'


export const checkAuth = (context) => {
    const { req: { headers: { authorization } } } = context;

    if(authorization){
        const token = authorization.split('Bearer ')[1];
        if(token){
            try {
                const user = jwt.verify(token, SECRET);
                return user;
            } catch (e){
                throw new AuthenticationError('Invalid/expired token')
            }
        }
        throw new Error('Authentication token must be \'Bearer token')
    }
    throw new Error('Authentication header must be provided')

}