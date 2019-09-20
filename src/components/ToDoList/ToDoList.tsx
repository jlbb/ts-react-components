import React from 'react';
import bem from 'bera';
import { TypeToDo } from '../ToDoApp';

const componentClass = bem('toDoList');

const ToDoList = ({ todo, removeToDo }: { todo: TypeToDo; removeToDo: any }) => {
    const renderToDoList = () => {
        return todo.map((toDoItem, i) => (
            <li className={componentClass('listItem')} key={`todo-${i}`}>
                {toDoItem.description}
                <span
                    className={`icon-box-remove ${componentClass('icon-removeItem')}`}
                    onClick={() => removeToDo(toDoItem.id)}
                />
            </li>
        ));
    };

    return (
        <div className={componentClass()}>
            <ul>{renderToDoList()}</ul>
        </div>
    );
};

export default ToDoList;
