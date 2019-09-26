import gql from 'graphql-tag';

const typeDefs = gql`
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

export default typeDefs;
