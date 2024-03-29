import * as React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import ToDoApp from '../components/ToDoApp/ToDoApp';
import { MockedProvider, MockedResponse, wait } from '@apollo/react-testing';
import { ToDo, ToDoItemInput, ToDoItemInputUpdate, ToDos } from '../types/types';
import {
    ADD_TODO,
    ADD_TODO_ITEM,
    REMOVE_TODO,
    REMOVE_TODO_ITEM,
    ROOT_GET_TODO_LIST_QUERY,
    UPDATE_TODO_ITEM,
} from '../graphql/ToDo/queries';

// https://trojanowski.dev/apollo-hooks-testing-without-act-warnings/
async function _wait(ms = 0) {
    await act(() => wait(ms));
}

let addToDoMutationCalled = false;
let removeToDoMutationCalled = false;
let addToDoItemMutationCalled = false;
let removeToDoItemMutationCalled = false;
let updateToDoItemMutationCalled = false;

const newToDo: ToDo = {
    id: '2',
    name: 'New ToDo hooks test list',
    toDoList: [],
};
const newToDoItemInput: ToDoItemInput = {
    description: 'Hook new ToDoItem',
};
const newToDoItem = {
    id: '1',
    ...newToDoItemInput,
    completed: false,
    __typename: 'ToDoItem',
};

const toDoItem = {
    id: 'a1',
    description: 'ToDo item to remove',
    completed: false,
    __typename: 'ToDoItem',
};
const toDoItemUpdated: ToDoItemInputUpdate = { ...toDoItem, completed: !toDoItem.completed };
const toDo: ToDo = {
    id: 'a1',
    name: 'Test ToDo list',
    toDoList: [toDoItem],
};

const data: ToDos = {
    toDos: [toDo],
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
                name: newToDo.name,
            },
        },
        result: () => {
            addToDoMutationCalled = true;
            return { data: { addToDo: newToDo } };
        },
    },
    {
        request: {
            query: REMOVE_TODO,
            variables: {
                id: toDo.id,
            },
        },
        result: () => {
            removeToDoMutationCalled = true;
            return { data: { removeToDo: toDo } };
        },
    },
    {
        request: {
            query: ADD_TODO_ITEM,
            variables: {
                idToDo: toDo.id,
                toDoItem: newToDoItemInput,
            },
        },
        result: () => {
            addToDoItemMutationCalled = true;
            return {
                data: {
                    addToDoItem: newToDoItem,
                },
            };
        },
    },
    {
        request: {
            query: REMOVE_TODO_ITEM,
            variables: {
                idToDo: toDo.id,
                idToDoItem: toDoItem.id,
            },
        },
        result: () => {
            removeToDoItemMutationCalled = true;
            return {
                data: { removeToDoItem: toDoItem },
            };
        },
    },
    {
        request: {
            query: UPDATE_TODO_ITEM,
            variables: {
                idToDo: toDo.id,
                toDoItem: toDoItemUpdated,
            },
        },
        result: () => {
            updateToDoItemMutationCalled = true;
            return {
                data: { updateToDoItem: toDoItemUpdated },
            };
        },
    },
];

afterEach(cleanup);
afterEach(() => {
    addToDoMutationCalled = false;
    removeToDoMutationCalled = false;
    addToDoItemMutationCalled = false;
    removeToDoItemMutationCalled = false;
    updateToDoItemMutationCalled = false;
});

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
        const { getByTestId } = render(
            <MockedProvider addTypename={false} mocks={mocks}>
                <ToDoApp />
            </MockedProvider>,
        );

        await _wait();

        fireEvent.change(getByTestId('inputForm-textInput-create') as HTMLInputElement, {
            target: {
                value: newToDo.name,
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

        fireEvent.click(getByTestId(`toDoApp-removeToDo`));

        await _wait();
        expect(removeToDoMutationCalled).toBe(true);
    });

    test('add a new ToDoItem to the toDo list', async () => {
        const { getByTestId } = render(
            <MockedProvider addTypename={false} mocks={mocks}>
                <ToDoApp />
            </MockedProvider>,
        );

        await _wait();

        fireEvent.change(getByTestId('inputForm-textInput-add') as HTMLInputElement, {
            target: {
                value: newToDoItemInput.description,
            },
        });

        await _wait();

        fireEvent.click(getByTestId('inputForm-submitButton-add') as HTMLButtonElement);

        await _wait();
        expect(addToDoItemMutationCalled).toBe(true);
    });

    test('remove a ToDoItem from the list', async () => {
        const { getByTestId } = render(
            <MockedProvider addTypename={false} mocks={mocks}>
                <ToDoApp />
            </MockedProvider>,
        );

        await _wait();

        fireEvent.click(getByTestId(`toDoList-removeToDoItem`));

        await _wait();
        expect(removeToDoItemMutationCalled).toBe(true);
    });

    test('update a ToDoItem from the list', async () => {
        const { getByTestId } = render(
            <MockedProvider addTypename={false} mocks={mocks}>
                <ToDoApp />
            </MockedProvider>,
        );

        await _wait();

        fireEvent.click(getByTestId(`toDoList-updateToDoItem`));

        await _wait();
        expect(updateToDoItemMutationCalled).toBe(true);
    });
});
