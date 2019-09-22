import gql from 'graphql-tag';

export const ADD_TODO_ITEM = gql`
    mutation AddToDoItem($toDoItem: ToDoItemInput!) {
        addToDoItem(toDoItem: $toDoItem) @client {
            id
            description
        }
    }
`;

export const REMOVE_TODO_ITEM = gql`
    mutation RemoveToDoItem($id: ID!) {
        removeToDoItem(id: $id) @client {
            id
            description
        }
    }
`;
