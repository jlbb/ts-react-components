import * as React from 'react';
import { render, cleanup, wait } from '@testing-library/react';
import ToDoApp from '../components/ToDoApp/ToDoApp';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { Maybe, ToDoItem, ToDos } from '../types/types';
import { ROOT_GET_TODO_LIST_QUERY } from '../graphql/ToDo/queries';

afterEach(cleanup);

describe('ToDoApp', () => {
    const toDoList: Maybe<ToDoItem>[] = [
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
    const data: ToDos = {
        toDos: [
            {
                id: 'a1',
                name: 'Test ToDo list',
                toDoList: toDoList,
            },
        ],
    };
    const mocks: MockedResponse[] = [
        {
            request: {
                query: ROOT_GET_TODO_LIST_QUERY,
            },
            result: {
                data: data,
            },
        },
    ];

    test('renders with an empty list', () => {
        const { container } = render(
            <MockedProvider>
                <ToDoApp />
            </MockedProvider>,
        );

        wait();
        expect(container.firstChild).toBeDefined();
    });

    test('renders with mock data simulating fetched one', () => {
        const { container } = render(
            <MockedProvider addTypename={false} mocks={mocks}>
                <ToDoApp />
            </MockedProvider>,
        );

        expect(container.firstChild).toBeDefined();
    });
});
