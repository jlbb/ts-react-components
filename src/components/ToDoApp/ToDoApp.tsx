import React, { useState } from 'react';
import bem from 'bera';
import ToDoList from '../ToDoList';

const componentClass = bem('toDoApp');

export type TypeToDo = typeof defaultToDo;

const defaultToDo = [
    {
        description: 'Default ToDo',
        id: 1,
    },
];

//https://medium.com/@woltter.xavier/simple-react-w-hooks-graphql-application-6985cd113079
const ToDoApp = () => {
    const [todos] = useState<TypeToDo>(defaultToDo);

    return (
        <div className={componentClass()}>
            <ToDoList todos={todos} />
        </div>
    );
};

export default ToDoApp;
