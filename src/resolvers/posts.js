import Post from '../models/Post.js'
import { checkAuth }  from "../checkAuth.js"
import User from '../models/User.js'
import { UserInputError } from 'apollo-server';


export const postsResolvers = {
    Query: {
        getPosts: async (_, { page }, context) => {

            checkAuth(context)

            const posts = await Post.find().sort({ createdAt: -1 });
            const range = 5;

            const portion = posts.slice(page * range, page * range + range);
            return portion
        }
    }, 

    Mutation: {
        createPost: async (_, { postInput: { video, title, description, tags } }, context) => {

            const { username } = checkAuth(context)
            const user = await User.findOne({ username })

            const newPost = new Post({
                video, owner: user, title, description, tags, createdAt: new Date().toISOString()
            })

            const post = await newPost.save();
            return post
        },

        deletePosts: async () => {
            await Post.deleteMany();
            return 'posts deleted'
        }, 

        likePost: async (_, { postId },  context) => {
            const { username } = checkAuth(context);
            const post = await Post.findById(postId);
            const like = post.likes.find(like => like === username);

            if (like){
                const updated = await Post.findByIdAndUpdate(postId, { $pull: { likes: username } })
                return updated
            } else {
                const updated = await Post.findByIdAndUpdate(postId, { $addToSet: { likes: username } })
                return updated
            }

        }, 

        deletePost: async (_, { postId }, context) => {
            const { username } = checkAuth(context);
            const post = await Post.findById(postId);

            if(post.owner.username === username){
                const deleted = await post.delete();
                if(deleted) return 'post deleted successfully'
            } else {
                throw new UserInputError('Only the owner can delete this post.')
            }
        }
    }
}