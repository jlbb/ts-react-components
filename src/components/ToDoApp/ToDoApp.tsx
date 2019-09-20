import React, { useEffect, useState } from 'react';
import bem from 'bera';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ToDoList from '../ToDoList';
import InputForm from '../InputForm';
import { GET_TODO_LIST_QUERY } from '../../graphql/queries';
import { ADD_TODO_ITEM } from '../../graphql/mutations';

const componentClass = bem('toDoApp');

type TypeToDo = typeof defaultToDo;
const defaultToDo = [
    {
        description: 'Default ToDo',
        id: '1',
    },
];

//https://medium.com/@woltter.xavier/simple-react-w-hooks-graphql-application-6985cd113079
const ToDoApp = () => {
    const { loading, data } = useQuery(GET_TODO_LIST_QUERY);
    const [addToDoItem] = useMutation(ADD_TODO_ITEM);

    const [todo, setToDo] = useState<TypeToDo>(defaultToDo);

    // When data has loaded, set it in the todo component state
    useEffect(() => {
        if (!loading && data) {
            setToDo(data.toDoList);
        }
    }, [loading]);

    const handleAddToDo = async (value: string) => {
        // TODO: handle add toDo with graphQL
        const toDoItem = {
            id: `${todo.length + 1}`,
            description: value,
        };
        const res = await addToDoItem({ variables: { toDoItem } });
        setToDo([...todo, res.data.addToDoItem]);
    };

    const handleRemoveToDo = (id: string) => {
        // TODO: handle add toDo with graphQL
        setToDo([...todo.filter(toDoItem => toDoItem.id !== id)]);
    };

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
