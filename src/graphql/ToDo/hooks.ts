import { useMutation, useQuery } from '@apollo/react-hooks';
import { Maybe, ToDo, ToDoItem, ToDoItemInput, ToDoItemInputUpdate, ToDos } from '../../types/types';
import {
    ADD_TODO,
    ADD_TODO_ITEM,
    REMOVE_TODO,
    REMOVE_TODO_ITEM,
    ROOT_GET_TODO_LIST_QUERY,
    UPDATE_TODO_ITEM,
} from './queries';

const useToDosQuery = () => {
    const { data } = useQuery<ToDos>(ROOT_GET_TODO_LIST_QUERY);

    return data && data.toDos;
};

const useAddToDoMutation = () => {
    const [addToDo] = useMutation<ToDo>(ADD_TODO);

    return (name: string) =>
        addToDo({
            variables: { name },
            update: (cache, { data }: any) => {
                const cacheQuery: ToDos = cache.readQuery({ query: ROOT_GET_TODO_LIST_QUERY }) || { toDos: [] };
                const updatedToDos = cacheQuery && data && cacheQuery.toDos.concat([data.addToDo]);
                cache.writeQuery({ query: ROOT_GET_TODO_LIST_QUERY, data: { toDos: updatedToDos } });
            },
        });
};

const useRemoveToDoMutation = () => {
    const [removeToDo] = useMutation<ToDo>(REMOVE_TODO);

    return (id: string) =>
        removeToDo({
            variables: { id },
            update: (cache, { data }: any) => {
                const cacheQuery: ToDos = cache.readQuery({ query: ROOT_GET_TODO_LIST_QUERY }) || { toDos: [] };
                const updatedToDos = cacheQuery && data && cacheQuery.toDos.filter(toDo => toDo && toDo.id !== id);
                cache.writeQuery({ query: ROOT_GET_TODO_LIST_QUERY, data: { toDos: updatedToDos } });
            },
        });
};

const useAddToDoItemMutation = () => {
    const [addToDoItem] = useMutation<ToDoItem>(ADD_TODO_ITEM);

    return (idToDo: string, toDoItem: ToDoItemInput) =>
        addToDoItem({
            variables: { idToDo, toDoItem },
            update: (cache, { data }: any) => {
                const cacheQuery: ToDos = cache.readQuery({ query: ROOT_GET_TODO_LIST_QUERY }) || { toDos: [] };
                const updatedToDos =
                    cacheQuery &&
                    data &&
                    cacheQuery.toDos.map((item: Maybe<ToDo>) => {
                        if (item && item.id === idToDo) {
                            item.toDoList.push(data.addToDoItem);
                        }
                        return item;
                    });
                cache.writeQuery({ query: ROOT_GET_TODO_LIST_QUERY, data: { toDos: updatedToDos } });
            },
        });
};

const useRemoveToDoItemMutation = () => {
    const [removeToDoItem] = useMutation<ToDoItem>(REMOVE_TODO_ITEM);

    return (idToDo: string, idToDoItem: string) =>
        removeToDoItem({
            variables: { idToDo, idToDoItem },
            update: (cache, { data }: any) => {
                const cacheQuery: ToDos = cache.readQuery({ query: ROOT_GET_TODO_LIST_QUERY }) || { toDos: [] };
                const updatedToDos =
                    cacheQuery &&
                    data &&
                    cacheQuery.toDos.map((item: Maybe<ToDo>) => {
                        if (item && item.id === idToDo) {
                            item.toDoList = item.toDoList.filter(toDo => toDo && toDo.id !== idToDoItem);
                        }
                        return item;
                    });
                cache.writeQuery({ query: ROOT_GET_TODO_LIST_QUERY, data: { toDos: updatedToDos } });
            },
        });
};

const useUpdateToDoItemMutation = () => {
    const [updateToDoItem] = useMutation<ToDoItem>(UPDATE_TODO_ITEM);

    return (idToDo: string, toDoItem: ToDoItemInputUpdate) =>
        updateToDoItem({
            variables: { idToDo, toDoItem },
            update: (cache, { data }: any) => {
                const cacheQuery: ToDos = cache.readQuery({ query: ROOT_GET_TODO_LIST_QUERY }) || { toDos: [] };
                const updatedToDos =
                    cacheQuery &&
                    data &&
                    cacheQuery.toDos.map((item: Maybe<ToDo>) => {
                        if (item && item.id === idToDo) {
                            item.toDoList = item.toDoList.map(toDo => {
                                if (toDo && toDo.id === toDoItem.id) {
                                    return { ...toDo, ...(toDoItem as ToDoItem) };
                                }
                                return toDo;
                            });
                        }
                        return item;
                    });
                cache.writeQuery({ query: ROOT_GET_TODO_LIST_QUERY, data: { toDos: updatedToDos } });
            },
        });
};

export {
    useToDosQuery,
    useAddToDoMutation,
    useRemoveToDoMutation,
    useAddToDoItemMutation,
    useUpdateToDoItemMutation,
    useRemoveToDoItemMutation,
};
