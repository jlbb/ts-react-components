import React from 'react';
import bem from 'bera';
import { TypeToDo } from '../ToDoApp';

const componentClass = bem('toDoList');

const ToDoList = ({ todos, removeToDo }: { todos: TypeToDo; removeToDo: any }) => {
    const renderToDoList = () => {
        return todos.map((todo, i) => {
            return (
                <li className={componentClass('listItem')} key={`todo-${i}`}>
                    {todo.description}
                    <span
                        className={`icon-box-remove ${componentClass('icon-removeItem')}`}
                        onClick={() => removeToDo(todo.id)}
                    />
                </li>
            );
        });
    };

    return (
        <div className={componentClass()}>
            <ul>{renderToDoList()}</ul>
        </div>
    );
};

export default ToDoList;
