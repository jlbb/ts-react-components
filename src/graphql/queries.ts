import gql from 'graphql-tag';

export const GET_TODO_LIST_QUERY = gql`
    query GetToDoList {
        toDoList @client {
            id @client
            description @client
        }
    }
`;

export const ADD_TODO_ITEM = gql`
    mutation updateToDoItem($todoItem: object) {
        updateToDoItem(todoItem: $todoItem) @client
    }
`;
