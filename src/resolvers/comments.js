import Post from "../models/Post.js"
import { UserInputError } from 'apollo-server'
import { checkAuth } from '../checkAuth.js'

export const commentsResolvers = {
    Mutation: {
        createComment: async (_ , { commentInput: { createdAt, content, postId } }, context) => {

            const { username } = checkAuth(context)
            const post = await Post.findById(postId);
            if(post){
                const newComment = {
                    owner: username, 
                    createdAt, 
                    content, 
                }
                post.comments.push(newComment);

                const newPost = await post.save();

                return newPost;

            } else throw new UserInputError('This post does not exists anymore')
        },

        deleteComment: async (_, { postId }, context) => {

            const { username } = checkAuth(context);

            const post = await Post.findById(postId)
            const index = post.comments.findIndex(comm => comm.owner === username);
            if(index > -1) post.comments.splice(index, 1);
            const newPost = await post.save()
            return newPost;
        }, 
    }
}
