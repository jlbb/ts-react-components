import gql from 'graphql-tag';

export const ADD_TODO_ITEM = gql`
    mutation AddToDoItem($toDoItem: ToDoItemInput!) {
        addToDoItem(toDoItem: $toDoItem) @client {
            id @client
            description @client
        }
    }
`;
