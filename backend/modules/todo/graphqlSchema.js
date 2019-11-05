// #1 Import the gql method from apollo-server-express
const { gql } = require('apollo-server');

// #2 Construct a schema with gql and using the GraphQL schema language
const typeDefs = gql`
    type ToDos {
        toDos: [ToDo]!
    }
    type ToDo {
        id: ID!
        name: String!
        toDoList: [ToDoItem]!
    }
    type ToDoItem {
        id: ID!
        description: String!
        completed: Boolean!
    }
    input ToDoItemInput {
        description: String!
        completed: Boolean
    }
    input ToDoItemInputUpdate {
        id: ID!
        description: String
        completed: Boolean
    }
    type Query {
        toDos: [ToDo]!
        toDoItems: [ToDoItem]!
    }
    type Mutation {
        addToDo(name: String!): ToDo!
        removeToDo(id: ID!): ToDo!
        updateToDo(id: ID!, name: String!): ToDo!
        addToDoItem(idToDo: ID!, toDoItem: ToDoItemInput!): ToDoItem!
        removeToDoItem(idToDo: ID!, idToDoItem: ID!): ToDoItem!
        updateToDoItem(idToDo: ID!, toDoItem: ToDoItemInputUpdate!): ToDoItem!
    }
`;

module.exports = typeDefs;
