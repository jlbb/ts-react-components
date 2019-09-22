import gql from 'graphql-tag';
import appState from './appState.json';
import { GET_TODO_LIST_QUERY } from './queries';

import { ToDoTypes } from '../components/ToDoApp';

const schema = `
  type ToDoItem {
    id: ID!,
    description: String!
  }
  input ToDoItemInput {
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
        addToDoItem: (_: any, { toDoItem }: { toDoItem: ToDoTypes.TypeToDoItem }, { cache }: any) => {
            const cacheQuery = cache.readQuery({ query: GET_TODO_LIST_QUERY });
            const newToDoItem = { id: cacheQuery.toDoList.length + 1, ...toDoItem, __typename: 'ToDoItem' };

            const data = { toDoList: cacheQuery.toDoList.concat([newToDoItem]) };
            cache.writeQuery({ query: GET_TODO_LIST_QUERY, data });

            return newToDoItem;
        },
        removeToDoItem: (_: any, { id }: { id: number }, { cache }: any) => {
            const cacheQuery = cache.readQuery({ query: GET_TODO_LIST_QUERY });

            const data = { toDoList: cacheQuery.toDoList.filter((item: any) => item.id !== id) };
            cache.writeQuery({ query: GET_TODO_LIST_QUERY, data });

            return cacheQuery.toDoItem;
        },
    },
};
