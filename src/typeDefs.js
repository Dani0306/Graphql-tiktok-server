import { gql } from 'apollo-server'

export const typeDefs = gql`

    type User {
        username: String!
        email: String!
        profile: String!
        followers: [User]!
        following: [User]!
        token: String!
        _id: ID!
    }

    type Comment {
        owner: String!
        content: String!
        createdAt: String!
    }

    type Post {
        _id: ID!
        video: String!
        comments: [Comment]!
        owner: User!
        likes: [String]!
        title: String!
        description: String!
        tags: [String]!
    }

 

    input PostInput {
        video: String!
        title: String!
        description: String!
        tags: String!
    }

    input CommentInput {
        createdAt: String!
        content: String!
        postId: String!
    }

    input registerInput {
        username: String!
        email: String!
        profile: String!
    }

    type Query {
        getPosts(page: Int!): [Post]!
        getUsers: [User]
        getUser: User!
    }

    type Mutation {
        createPost(postInput: PostInput): Post!
        createComment(commentInput: CommentInput): Post!
        deleteComment(postId: String!): Post!
        likePost(postId: String!): Post!
        deletePosts: String
        deletePost(postId: String!): String!

        register(registerInput: registerInput): User!
        deleteUsers: String!
        login(email: String!): User!
    }

`
