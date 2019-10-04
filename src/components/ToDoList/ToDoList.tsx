import React from 'react';
import bem from 'bera';
import { Maybe, ToDoItem } from '../../types/types';

const componentClass = bem('toDoList');

const ToDoList = ({
    todo,
    onRemoveToDo,
    onUpdateToDo,
}: {
    todo: Maybe<ToDoItem>[];
    onRemoveToDo: any;
    onUpdateToDo: any;
}) => {
    const renderToDoList = () => {
        return todo.map(
            (toDoItem: Maybe<ToDoItem>) =>
                toDoItem && (
                    <li className={componentClass('listItem')} key={`todo-${toDoItem.id}`}>
                        {toDoItem.description}
                        <input
                            checked={toDoItem.completed}
                            className={componentClass('checkbox')}
                            data-testid={`toDoList-updateToDoItem-${toDoItem.id}`}
                            type={'checkbox'}
                            onChange={() => onUpdateToDo({ ...toDoItem, completed: !toDoItem.completed })}
                        />
                        <span
                            className={`icon-box-remove ${componentClass('icon-removeItem')}`}
                            data-testid={`toDoList-removeToDoItem-${toDoItem.id}`}
                            onClick={() => onRemoveToDo(toDoItem.id)}
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

export default ToDoList;
