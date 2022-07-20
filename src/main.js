import { ApolloServer } from 'apollo-server';
import connectDatabase from './database.js'
import { typeDefs } from './typeDefs.js'
import { resolvers } from './resolvers/index.js';

const server = new ApolloServer({
    typeDefs,
    resolvers, 
    context: ({ req }) => ({ req }), 
})


connectDatabase()
server.listen({ port: 5000 }).then(() => console.log('server running'))