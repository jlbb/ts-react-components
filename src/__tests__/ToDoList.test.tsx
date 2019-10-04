import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ToDoList from '../components/ToDoList/ToDoList';
import { Maybe, ToDoItem } from '../types/types';

afterEach(cleanup);

describe('ToDoList', () => {
    const todo: Maybe<ToDoItem>[] = [
        {
            id: '1',
            description: 'Test ToDoItem 1',
            completed: false,
        },
        {
            id: '2',
            description: 'Test ToDoItem 2',
            completed: false,
        },
    ];
    const removeToDo = jest.fn();
    const updateToDo = jest.fn();

    test('element renders with an empty list', () => {
        const { container } = render(<ToDoList todo={[]} onRemoveToDo={removeToDo} onUpdateToDo={updateToDo} />);

        expect(container.firstChild).toBeDefined();
    });

    test('element renders with a n-elements list', () => {
        const { container } = render(<ToDoList todo={todo} onRemoveToDo={removeToDo} onUpdateToDo={updateToDo} />);

        expect(container.firstChild).toBeDefined();
    });

    test('element renders and remove item callback is triggered', () => {
        const { getByTestId } = render(<ToDoList todo={todo} onRemoveToDo={removeToDo} onUpdateToDo={updateToDo} />);

        getByTestId(`removeToDoItem-test1`).click();

        expect(removeToDo).toBeCalledWith('1');
        expect(removeToDo).toHaveBeenCalledTimes(1);
    });

    test('element renders and update item callback is triggered', () => {
        const newItemCompleteValue = true;
        const { getByTestId } = render(<ToDoList todo={todo} onRemoveToDo={removeToDo} onUpdateToDo={updateToDo} />);

        fireEvent.click(getByTestId('updateToDoItem-test1'), { target: { value: newItemCompleteValue } });

        const updatedItem = { ...todo[0], completed: newItemCompleteValue };

        expect(updateToDo).toBeCalledWith(updatedItem);
        expect(updateToDo).toHaveBeenCalledTimes(1);
    });
});
