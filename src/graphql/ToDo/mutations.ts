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
        toDos {
            id
            name
            toDoList {
                ...ToDoItemFields
            }
        }
    }
    ${TODO_ITEM_FIELDS}
`;

// ***** MUTATIONS ***** //
// ********************* //

export const ADD_TODO = gql`
    mutation AddToDoItem($name: String!) {
        addToDo(name: $name) {
            id
            name
            toDoList {
                ...ToDoItemFields
            }
        }
    }
    ${TODO_ITEM_FIELDS}
`;

export const ADD_TODO_ITEM = gql`
    mutation AddToDoItem($idToDo: ID!, $toDoItem: ToDoItemInput!) {
        addToDoItem(idToDo: $idToDo, toDoItem: $toDoItem) {
            ...ToDoItemFields
        }
    }
    ${TODO_ITEM_FIELDS}
`;

export const REMOVE_TODO_ITEM = gql`
    mutation RemoveToDoItem($idToDo: ID!, $idToDoItem: ID!) {
        removeToDoItem(idToDo: $idToDo, idToDoItem: $idToDoItem) {
            ...ToDoItemFields
        }
    }
    ${TODO_ITEM_FIELDS}
`;

export const UPDATE_TODO_ITEM = gql`
    mutation UpdateToDoItem($idToDo: ID!, $toDoItem: ToDoItemInputUpdate!) {
        updateToDoItem(idToDo: $idToDo, toDoItem: $toDoItem) {
            ...ToDoItemFields
        }
    }
    ${TODO_ITEM_FIELDS}
`;
