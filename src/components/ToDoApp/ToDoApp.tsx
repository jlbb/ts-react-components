import React, { useState } from 'react';
import bem from 'bera';
import ToDoList from '../ToDoList';
import InputForm from '../InputForm';

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
    const [todos, setToDo] = useState<TypeToDo>(defaultToDo);

    const handleAddToDo = (value: string) => {
        // TODO: handle add toDo with graphQL
        const toDoItem = {
            description: value,
            id: todos.length + 1,
        };
        setToDo([...todos, toDoItem]);
    };

    const handleRemoveToDo = (id: number) => {
        // TODO: handle add toDo with graphQL
        setToDo([...todos.filter(todo => todo.id !== id)]);
    };

    return (
        <div className={componentClass()}>
            <h3>ToDoApp using Hooks and GraphQL</h3>
            <InputForm addToDo={handleAddToDo} />
            <ToDoList removeToDo={handleRemoveToDo} todos={todos} />
        </div>
    );
};

export { TypeToDo };
export default ToDoApp;
