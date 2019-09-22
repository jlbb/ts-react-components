import React from 'react';
import bem from 'bera';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ToDoList from '../ToDoList';
import InputForm from '../InputForm';
import { GET_TODO_LIST_QUERY } from '../../graphql/queries';
import { ADD_TODO_ITEM, REMOVE_TODO_ITEM } from '../../graphql/mutations';
import { TypeToDoItem, TypeToDoList } from './types';

const componentClass = bem('toDoApp');

const defaultToDo = [
    {
        id: 1,
        description: '',
    },
];

const ToDoApp = () => {
    const { loading, data } = useQuery<TypeToDoList>(GET_TODO_LIST_QUERY);
    const [addToDoItem] = useMutation<TypeToDoItem>(ADD_TODO_ITEM);
    const [removeToDoItem] = useMutation<TypeToDoItem>(REMOVE_TODO_ITEM);

    const handleAddToDo = async (value: string) => {
        const toDoItem = {
            description: value,
        };
        await addToDoItem({ variables: { toDoItem } });
    };

    const handleRemoveToDo = async (id: number) => {
        await removeToDoItem({ variables: { id } });
    };

    console.log('TODO (data from GET_TODO_LIST_QUERY)', data);

    return (
        <div className={componentClass()}>
            <h3>ToDoApp using Hooks and GraphQL</h3>
            <InputForm addToDo={handleAddToDo} />
            <ToDoList removeToDo={handleRemoveToDo} todo={loading || !data ? defaultToDo : data.toDoList} />
        </div>
    );
};

export default ToDoApp;
