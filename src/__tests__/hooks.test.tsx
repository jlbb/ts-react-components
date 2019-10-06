// http://medium.com/@nitinpatel_20236/unit-testing-custom-react-hooks-caa86f58510
// https://github.com/apollographql/react-apollo/issues/2867
// TODO: Check invariant violation happened when adding ToDo object, and addToDo performs the cache update
import { act, renderHook } from '@testing-library/react-hooks';
import {
    useAddToDoItemMutation,
    useAddToDoMutation,
    useRemoveToDoItemMutation,
    useRemoveToDoMutation,
    useUpdateToDoItemMutation,
} from '../graphql/ToDo/hooks';
import { cleanup } from '@testing-library/react';
import { ToDo, ToDoItemInput, ToDoItemInputUpdate, ToDos } from '../types/types';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import {
    ADD_TODO,
    ADD_TODO_ITEM,
    REMOVE_TODO,
    REMOVE_TODO_ITEM,
    ROOT_GET_TODO_LIST_QUERY,
    UPDATE_TODO_ITEM,
} from '../graphql/ToDo/queries';

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
    completed: true,
    __typename: 'ToDoItem',
};
const toDoItemUpdated: ToDoItemInputUpdate = { ...toDoItem, description: 'Updated ToDo item' };
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
        result: {
            data: { addToDo: newToDo },
        },
    },
    {
        request: {
            query: REMOVE_TODO,
            variables: {
                id: toDo.id,
            },
        },
        result: {
            data: { removeToDo: toDo },
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
        result: {
            data: { addToDoItem: newToDoItem },
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
        result: {
            data: { removeToDoItem: toDoItem },
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
        result: {
            data: { updateToDoItem: toDoItemUpdated },
        },
    },
];

const wrapHook = () => {
    const component = MockedProvider;
    component.defaultProps = {
        addTypename: false,
        mocks: mocks,
    };
    return component;
};

afterEach(cleanup);

describe('hooks', () => {
    test('useAddToDoMutation', async () => {
        const {
            result: { current: addToDo },
        } = renderHook(useAddToDoMutation, { wrapper: wrapHook() });

        await act(async () => {
            const {
                data: { addToDo: resToDo },
            }: any = await addToDo(newToDo.name);

            expect(resToDo).toEqual(newToDo);
        });
    });

    test('removeAddToDoMutation', async () => {
        const {
            result: { current: removeToDo },
        } = renderHook(useRemoveToDoMutation, { wrapper: wrapHook() });

        await act(async () => {
            const {
                data: { removeToDo: resToDo },
            }: any = await removeToDo(toDo.id);

            expect(resToDo).toEqual(toDo);
        });
    });

    test('useAddToDoItemMutation', async () => {
        const {
            result: { current: addToDoItem },
        } = renderHook(useAddToDoItemMutation, { wrapper: wrapHook() });

        await act(async () => {
            const {
                data: { addToDoItem: resToDo },
            }: any = await addToDoItem(toDo.id, newToDoItemInput);

            expect(resToDo).toEqual(newToDoItem);
        });
    });

    test('useRemoveToDoItemMutation', async () => {
        const {
            result: { current: removeToDoItem },
        } = renderHook(useRemoveToDoItemMutation, { wrapper: wrapHook() });

        await act(async () => {
            const {
                data: { removeToDoItem: resToDo },
            }: any = await removeToDoItem(toDo.id, toDoItem.id);

            expect(resToDo).toEqual(toDoItem);
        });
    });

    test('useUpdateToDoItemMutation', async () => {
        const {
            result: { current: updateToDoItem },
        } = renderHook(useUpdateToDoItemMutation, { wrapper: wrapHook() });

        await act(async () => {
            const {
                data: { updateToDoItem: resToDo },
            }: any = await updateToDoItem(toDo.id, toDoItemUpdated);

            expect(resToDo).toEqual(toDoItemUpdated);
        });
    });
});
