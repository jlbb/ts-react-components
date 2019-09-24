import React from 'react';
import bem from 'bera';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ToDoListComponent from '../ToDoList';
import InputForm from '../InputForm';
import { ROOT_GET_TODO_LIST_QUERY } from '../../graphql/ToDo/mutations';
import { ADD_TODO_ITEM, REMOVE_TODO_ITEM, UPDATE_TODO_ITEM } from '../../graphql/ToDo/mutations';
import { ToDoItem, ToDoItemInput, ToDoList } from '../../types/types';

const componentClass = bem('toDoApp');

const defaultToDo = {
    toDoList: [
        {
            id: '1',
            description: '',
            completed: false,
        },
    ],
};

const ToDoApp = () => {
    const { loading, data } = useQuery<ToDoList>(ROOT_GET_TODO_LIST_QUERY);
    const [addToDoItem] = useMutation<ToDoItem>(ADD_TODO_ITEM);
    const [removeToDoItem] = useMutation<ToDoItem>(REMOVE_TODO_ITEM);
    const [updateToDoItem] = useMutation<ToDoItem>(UPDATE_TODO_ITEM);

    const handleAddToDo = async (value: string) => {
        const toDoItem: ToDoItemInput = {
            description: value,
        };
        await addToDoItem({ variables: { toDoItem } });
    };

    const handleRemoveToDo = async (id: number) => {
        await removeToDoItem({ variables: { id } });
    };

    const handleUpdateToDo = async (toDoItem: ToDoItemInput) => {
        await updateToDoItem({ variables: { toDoItem } });
    };

    console.log('TODO (data from ROOT_GET_TODO_LIST_QUERY)', data);

    return (
        <div className={componentClass()}>
            <h3>ToDoApp using Hooks and GraphQL (and Apollo)</h3>
            <InputForm addToDo={handleAddToDo} />
            <ToDoListComponent
                removeToDo={handleRemoveToDo}
                todo={loading || !data ? defaultToDo : data}
                updateToDo={handleUpdateToDo}
            />
        </div>
    );
};

export default ToDoApp;
