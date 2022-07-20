import { postsResolvers } from './posts.js'
import { commentsResolvers } from './comments.js'
import { usersResolvers } from './users.js'

export const resolvers = {
    Query: {
        ...postsResolvers.Query,
        ...usersResolvers.Query
    }, 

    Mutation: {
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation, 
        ...usersResolvers.Mutation
    }
}