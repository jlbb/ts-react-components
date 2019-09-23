import gql from 'graphql-tag';

const typeDefs = gql`
    type ToDoList {
        toDoList: [ToDoItem]!
    }
    type ToDoItem {
        id: ID!
        description: String!
        completed: Boolean!
    }
    input ToDoItemInput {
        id: ID
        description: String!
        completed: Boolean
    }
    type Query {
        toDoList: [ToDoItem]!
    }
    type Mutation {
        addToDoItem(toDoItem: ToDoItemInput!): ToDoItem!
        removeToDoItem(id: ID!): ToDoItem!
        updateToDoItem(toDoItem: ToDoItemInput!): ToDoItem!
    }
`;

export default typeDefs;
