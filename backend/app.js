const connectDB = require('./config/db');
const { ApolloServer } = require('apollo-server');

// #1 Import GraphQL type definitions
const typeDefs = require('./modules/todo/graphqlSchema');
// #2 Import GraphQL resolvers
const resolvers = require('./modules/todo/resolvers');

require('dotenv').config({ path: __dirname + '/./../.env' });

// Connect Mongo database
connectDB();

// #3 Initialize an Apollo server
// https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});

const port = process.env.PORT || 7000;

// #4 Apollo server starts to listen at port
server.listen(port).then(({ url }) => {
    console.log(`🚀  Apollo server ready at ${url}`);
});
