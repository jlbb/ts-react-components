import React, { useEffect, useState } from 'react';
import bem from 'bera';
import { useQuery } from '@apollo/react-hooks';
import ToDoList from '../ToDoList';
import InputForm from '../InputForm';
import { GET_TODO_LIST_QUERY } from '../../graphql/queries';

const componentClass = bem('toDoApp');

type TypeToDo = typeof defaultToDo;
const defaultToDo = [
    {
        description: 'Default ToDo',
        id: 1,
    },
];

//https://medium.com/@woltter.xavier/simple-react-w-hooks-graphql-application-6985cd113079
const ToDoApp = () => {
    const { loading, data } = useQuery(GET_TODO_LIST_QUERY);
    const [todo, setToDo] = useState<TypeToDo>(defaultToDo);

    const handleAddToDo = (value: string) => {
        // TODO: handle add toDo with graphQL
        const toDoItem = {
            description: value,
            id: todo.length + 1,
        };
        setToDo([...todo, toDoItem]);
    };

    const handleRemoveToDo = (id: number) => {
        // TODO: handle add toDo with graphQL
        setToDo([...todo.filter(toDoItem => toDoItem.id !== id)]);
    };

    // When data has loaded, set it in the todo component state
    useEffect(() => {
        if (!loading && data) {
            setToDo(data.toDoList);
        }
    }, [loading]);

    return (
        <div className={componentClass()}>
            <h3>ToDoApp using Hooks and GraphQL</h3>
            <InputForm addToDo={handleAddToDo} />
            <ToDoList removeToDo={handleRemoveToDo} todo={todo} />
        </div>
    );
};

export { TypeToDo };
export default ToDoApp;
