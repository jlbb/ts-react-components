import React from 'react';
import bem from 'bera';
import { TypeToDo } from '../ToDoApp';

const componentClass = bem('toDoList');

const ToDoList = ({ todos }: { todos: TypeToDo }) => {
    const renderToDoList = () => {
        return todos.map((todo, i) => <li key={`todo-${i}`}>{todo.description}</li>);
    };

    return (
        <div className={componentClass()}>
            <ul>{renderToDoList()}</ul>
        </div>
    );
};

export default ToDoList;
