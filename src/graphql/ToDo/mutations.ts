import gql from 'graphql-tag';

// ***** FRAGMENTS ***** //
// ********************* //

const TODO_ITEM_FIELDS = gql`
    fragment ToDoItemFields on ToDoItem {
        id
        description
        completed
    }
`;

// ***** QUERIES ***** //
// ******************* //

export const ROOT_GET_TODO_LIST_QUERY = gql`
    query GetToDoList {
        toDoList @client {
            ...ToDoItemFields
        }
    }
    ${TODO_ITEM_FIELDS}
`;

// ***** MUTATIONS ***** //
// ********************* //

export const ADD_TODO_ITEM = gql`
    mutation AddToDoItem($toDoItem: ToDoItemInput!) {
        addToDoItem(toDoItem: $toDoItem) @client {
            ...ToDoItemFields
        }
    }
    ${TODO_ITEM_FIELDS}
`;

export const REMOVE_TODO_ITEM = gql`
    mutation RemoveToDoItem($id: ID!) {
        removeToDoItem(id: $id) @client {
            ...ToDoItemFields
        }
    }
    ${TODO_ITEM_FIELDS}
`;

export const UPDATE_TODO_ITEM = gql`
    mutation UpdateToDoItem($toDoItem: ToDoItemInput!) {
        updateToDoItem(toDoItem: $toDoItem) @client {
            ...ToDoItemFields
        }
    }
    ${TODO_ITEM_FIELDS}
`;
