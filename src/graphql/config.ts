import gql from 'graphql-tag';
import appState from './appState.json';

const schema = `
  type ToDoItem {
    id: String!,
    description: String!
  }
  type Query {
    toDoList: [TodoItem]!
  }
  type Mutation {
    addToDoItem(item: ToDoItem!): [TodoItem]!
  }
`;

export const typeDefs = gql`
    ${schema}
`;

export const resolvers = {
    Query: {
        toDoList: () => appState.toDoList,
    },
    // eslint-disable-next-line sort-keys
    Mutation: {
        addToDoItem: (_: any, toDoItem: object) => {
            return [...appState.toDo, toDoItem];
        },
    },
};
