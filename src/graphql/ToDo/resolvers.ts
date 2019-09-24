import merge = require('lodash/merge');
import {
    AddToDoItemMutationArgs,
    MutationResolvers,
    QueryResolvers,
    RemoveToDoItemMutationArgs,
    ToDoItem,
    ToDoList,
    UpdateToDoItemMutationArgs,
} from '../../types/types';
import { idGenerator } from '../utils';
import initialState from '../initialState.json';
import { ROOT_GET_TODO_LIST_QUERY } from './mutations';

const Query: QueryResolvers.Resolvers = {
    toDoList: () => initialState.toDoList,
};

const Mutation: MutationResolvers.Resolvers = {
    addToDoItem: (_: any, { toDoItem }: AddToDoItemMutationArgs, { cache }: any) => {
        const cacheQuery = cache.readQuery({ query: ROOT_GET_TODO_LIST_QUERY });
        const newToDoItem: ToDoItem = {
            ...merge(Object.assign({}, initialState.toDoList[0]), toDoItem),
            id: idGenerator(),
        };

        const data: ToDoList = { toDoList: cacheQuery.toDoList.concat([newToDoItem]) };
        cache.writeQuery({ query: ROOT_GET_TODO_LIST_QUERY, data });

        return newToDoItem;
    },
    removeToDoItem: (_: any, { id }: RemoveToDoItemMutationArgs, { cache }: any) => {
        const cacheQuery = cache.readQuery({ query: ROOT_GET_TODO_LIST_QUERY });

        const data: ToDoList = { toDoList: cacheQuery.toDoList.filter((item: ToDoItem) => item.id !== id) };
        cache.writeQuery({ query: ROOT_GET_TODO_LIST_QUERY, data });

        return cacheQuery.toDoList.filter((item: ToDoItem) => item.id === id)[0];
    },
    updateToDoItem: (_: any, { toDoItem }: UpdateToDoItemMutationArgs, { cache }: any) => {
        const cacheQuery = cache.readQuery({ query: ROOT_GET_TODO_LIST_QUERY });
        const newToDoItem: ToDoItem = merge(toDoItem);

        const data: ToDoList = { toDoList: merge(cacheQuery.toDoList, [newToDoItem]) };
        cache.writeQuery({ query: ROOT_GET_TODO_LIST_QUERY, data });

        return newToDoItem;
    },
};

export default { Query, Mutation };
