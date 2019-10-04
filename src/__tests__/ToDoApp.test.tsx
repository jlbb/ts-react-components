import * as React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import ToDoApp from '../components/ToDoApp/ToDoApp';
import { MockedProvider, MockedResponse, wait } from '@apollo/react-testing';
import { ToDo, ToDos } from '../types/types';
import { ADD_TODO, REMOVE_TODO, ROOT_GET_TODO_LIST_QUERY } from '../graphql/ToDo/queries';

afterEach(cleanup);

// https://trojanowski.dev/apollo-hooks-testing-without-act-warnings/
async function _wait(ms = 0) {
    await act(() => wait(ms));
}

let addToDoMutationCalled = false;
let removeToDoMutationCalled = false;

const toDoList = [
    {
        id: '1',
        description: 'Test ToDoItem 1',
        completed: false,
        __typename: 'ToDoItem',
    },
    {
        id: '2',
        description: 'Test ToDoItem 2',
        completed: false,
        __typename: 'ToDoItem',
    },
];
const data: ToDos = {
    toDos: [
        {
            id: 'a1',
            name: 'Test ToDo list',
            toDoList: toDoList,
        },
    ],
};
const addToDo: ToDo = {
    id: 'a2',
    name: 'New ToDo list',
    toDoList: [],
};
const removeToDo: ToDo = {
    id: 'a1',
    name: 'Test ToDo list',
    toDoList: toDoList,
};

const mocks: MockedResponse[] = [
    {
        request: {
            query: ROOT_GET_TODO_LIST_QUERY,
        },
        result: {
            data: { toDos: data.toDos },
        },
    },
    {
        request: {
            query: ADD_TODO,
            variables: {
                name: addToDo.name,
            },
        },
        result: () => {
            addToDoMutationCalled = true;
            return { data: { addToDo } };
        },
    },
    {
        request: {
            query: REMOVE_TODO,
            variables: {
                id: removeToDo.id,
            },
        },
        result: () => {
            removeToDoMutationCalled = true;
            return { data: { removeToDo } };
        },
    },
];

describe('ToDoApp', () => {
    test('renders with an empty list', async () => {
        const { container } = render(
            <MockedProvider>
                <ToDoApp />
            </MockedProvider>,
        );

        await _wait();
        expect(container.firstChild).toBeDefined();
    });

    test('renders and fetches mock data', async () => {
        const { getByTestId } = render(
            <MockedProvider addTypename={false} mocks={mocks}>
                <ToDoApp />
            </MockedProvider>,
        );

        await _wait();
        expect(getByTestId('toDoApp-fetchedData')).toBeDefined();
    });
});

describe('ToDoApp invokes to', () => {
    test('add a new ToDo list', async () => {
        const newValue = 'New ToDo list';
        const { getByTestId } = render(
            <MockedProvider addTypename={false} mocks={mocks}>
                <ToDoApp />
            </MockedProvider>,
        );

        await _wait();

        fireEvent.change(getByTestId('inputForm-textInput-create') as HTMLInputElement, {
            target: {
                value: newValue,
            },
        });

        await _wait();

        fireEvent.click(getByTestId('inputForm-submitButton-create') as HTMLButtonElement);

        await _wait();
        expect(addToDoMutationCalled).toBe(true);
    });

    test('remove a ToDo list', async () => {
        const { getByTestId } = render(
            <MockedProvider addTypename={false} mocks={mocks}>
                <ToDoApp />
            </MockedProvider>,
        );

        await _wait();

        fireEvent.click(getByTestId(`toDoApp-removeToDo-${removeToDo.id}`));

        await _wait();
        expect(removeToDoMutationCalled).toBe(true);
    });
});
