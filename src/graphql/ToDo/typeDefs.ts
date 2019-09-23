import gql from 'graphql-tag';

const typeDefs = gql`
    type ToDoList {
        toDoList: [ToDoItem]!
    }
    type ToDoItem {
        id: ID!
        description: String!
    }
    input ToDoItemInput {
        description: String!
    }
    type Query {
        toDoList: [ToDoItem]!
    }
    type Mutation {
        addToDoItem(toDoItem: ToDoItemInput!): ToDoItem!
        removeToDoItem(id: ID!): ToDoItem!
    }
`;

export default typeDefs;
