import gql from 'graphql-tag';
import appState from './appState.json';

const schema = `
  type ToDoItem {
    id: String!,
    description: String!
  }
  input ToDoItemInput {
    id: String!,
    description: String!
  }
  type Query {
    toDoList: [TodoItem]!
  }
  type Mutation {
    addToDoItem(toDoItem: ToDoItemInput!): TodoItem!
  }
`;

export const typeDefs = gql`
    ${schema}
`;

export const resolvers = {
    Query: {
        toDoList: () => appState.toDoList,
    },
    Mutation: {
        addToDoItem: (_: any, { toDoItem }: { toDoItem: object }) => {
            return { ...toDoItem, __typename: 'ToDoItem' };
        },
    },
};
