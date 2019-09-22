import React from 'react';
import bem from 'bera';
import { TypeToDoList } from '../ToDoApp/types';

const componentClass = bem('toDoList');

const ToDoList = ({ todo, removeToDo }: { todo: TypeToDoList['toDoList']; removeToDo: any }) => {
    const renderToDoList = () => {
        return todo.map(toDoItem => (
            <li className={componentClass('listItem')} key={`todo-${toDoItem.id}`}>
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
