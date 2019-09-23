import React from 'react';
import bem from 'bera';
import { Maybe, ToDoItem, ToDoList } from '../../types/types';

const componentClass = bem('toDoList');

const ToDoListComponent = ({ todo, removeToDo }: { todo: ToDoList; removeToDo: any }) => {
    const renderToDoList = () => {
        return todo.toDoList.map(
            (toDoItem: Maybe<ToDoItem>) =>
                toDoItem && (
                    <li className={componentClass('listItem')} key={`todo-${toDoItem.id}`}>
                        {toDoItem.description}
                        <span
                            className={`icon-box-remove ${componentClass('icon-removeItem')}`}
                            onClick={() => removeToDo(toDoItem.id)}
                        />
                    </li>
                ),
        );
    };

    return (
        <div className={componentClass()}>
            <ul>{renderToDoList()}</ul>
        </div>
    );
};

export default ToDoListComponent;
