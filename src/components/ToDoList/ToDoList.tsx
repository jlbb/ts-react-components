import React from 'react';
import bem from 'bera';
import { Maybe, ToDoItem, ToDoList } from '../../types/types';

const componentClass = bem('toDoList');

const ToDoListComponent = ({ todo, removeToDo, updateToDo }: { todo: ToDoList; removeToDo: any; updateToDo: any }) => {
    const renderToDoList = () => {
        return todo.toDoList.map(
            (toDoItem: Maybe<ToDoItem>) =>
                toDoItem && (
                    <li className={componentClass('listItem')} key={`todo-${toDoItem.id}`}>
                        {toDoItem.description}
                        <input
                            checked={toDoItem.completed}
                            className={componentClass('checkbox')}
                            type={'checkbox'}
                            onChange={() => updateToDo({ ...toDoItem, completed: !toDoItem.completed })}
                        />
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
