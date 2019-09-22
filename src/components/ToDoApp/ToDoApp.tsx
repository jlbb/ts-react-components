import React from 'react';
import bem from 'bera';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ToDoList from '../ToDoList';
import InputForm from '../InputForm';
import { GET_TODO_LIST_QUERY } from '../../graphql/queries';
import { ADD_TODO_ITEM } from '../../graphql/mutations';

const componentClass = bem('toDoApp');

type TypeToDo = typeof defaultToDo;
const defaultToDo = [
    {
        id: '1',
        description: '',
    },
];

const updateToDoListCache = (store: any, { data: updatedData }: any) => {
    // Read the data from our cache for this query.
    const res = store.readQuery({ query: GET_TODO_LIST_QUERY });
    // Add our comment from the mutation to the end.
    const data = { toDoList: res.toDoList.concat([updatedData.addToDoItem]) };
    // Write our data back to the cache.
    store.writeQuery({ query: GET_TODO_LIST_QUERY, data });
};

const ToDoApp = () => {
    const { loading, data } = useQuery(GET_TODO_LIST_QUERY);
    const [addToDoItem] = useMutation(ADD_TODO_ITEM);

    const handleAddToDo = async (value: string) => {
        const toDoItem = {
            id: `${data.toDoList.length + 1}`,
            description: value,
        };
        await addToDoItem({
            variables: { toDoItem },
            update: updateToDoListCache,
        });
    };

    const handleRemoveToDo = (id: string) => {
        // TODO: handle add toDo with graphQL
        // setToDo([...todo.filter(toDoItem => toDoItem.id !== id)]);
    };

    console.log('TODO (data from GET_TODO_LIST_QUERY)', data);

    return (
        <div className={componentClass()}>
            <h3>ToDoApp using Hooks and GraphQL</h3>
            <InputForm addToDo={handleAddToDo} />
            <ToDoList removeToDo={handleRemoveToDo} todo={loading ? defaultToDo : data.toDoList} />
        </div>
    );
};

export { TypeToDo };
export default ToDoApp;
