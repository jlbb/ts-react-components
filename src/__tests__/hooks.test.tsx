// http://medium.com/@nitinpatel_20236/unit-testing-custom-react-hooks-caa86f58510
// https://github.com/apollographql/react-apollo/issues/2867
// TODO: Check invariant violation happened when adding ToDo object, and addToDo performs the cache update
import { act, renderHook } from '@testing-library/react-hooks';
import { useAddToDoMutation } from '../graphql/ToDo/hooks';
import { ToDo, ToDos } from '../types/types';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { ADD_TODO, ROOT_GET_TODO_LIST_QUERY } from '../graphql/ToDo/queries';

const newToDo: ToDo = {
    id: '2',
    name: 'New ToDo hooks test list',
    toDoList: [],
};
const data: ToDos = {
    toDos: [
        {
            id: 'a1',
            name: 'Test ToDo list',
            toDoList: [],
        },
    ],
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
];
const wrapHook = () => {
    const component = MockedProvider;
    component.defaultProps = {
        addTypename: false,
        mocks: mocks,
    };
    return component;
};

describe('hooks', () => {
    test('useAddToMutation', async () => {
        const {
            result: { current: addToDo },
        } = renderHook(useAddToDoMutation, { wrapper: wrapHook() });

        await act(async () => {
            const {
                data: { addToDo: resToDo },
            }: any = await addToDo(newToDo.name);

            // console.log('res', resToDo);
            expect(resToDo).toEqual(newToDo);
        });
    });
});
