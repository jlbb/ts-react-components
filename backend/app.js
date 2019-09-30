const express = require('express');
const connectDB = require('./config/db');
const { ApolloServer } = require('apollo-server-express');
const graphqlHTTP = require('express-graphql');
const ToDo = require('./modules/todo/models');

// #1 Import GraphQL type definitions
const typeDefs = require('./modules/todo/graphqlSchema');
// #2 Import GraphQL resolvers
const resolvers = require('./modules/todo/resolvers');

// Connect Mongo database
connectDB();

// #3 Initialize an Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ app });

app.use(
    '/graphql',
    graphqlHTTP({
        schema: ToDo,
        graphiql: true,
    }),
);

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server running on port ${port}`));