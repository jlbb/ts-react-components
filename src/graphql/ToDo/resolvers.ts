import merge = require('lodash/merge');
import {
    AddToDoItemMutationArgs,
    MutationResolvers,
    QueryResolvers,
    RemoveToDoItemMutationArgs,
    ToDoItem,
    ToDoList
} from '../../types/types';
import { idGenerator } from '../utils';
import initialState from '../initialState.json';
import { GET_TODO_LIST_QUERY } from './queries';

const Query: QueryResolvers.Resolvers = {
    toDoList: () => initialState.toDoList,
};

const Mutation: MutationResolvers.Resolvers = {
    addToDoItem: (_: any, { toDoItem }: AddToDoItemMutationArgs, { cache }: any) => {
        const cacheQuery = cache.readQuery({ query: GET_TODO_LIST_QUERY });
        const newToDoItem: ToDoItem = { ...merge(Object.assign({}, initialState.toDoList[0]), toDoItem), id: idGenerator() };

        const data = { toDoList: cacheQuery.toDoList.concat([newToDoItem]) };
        cache.writeQuery({ query: GET_TODO_LIST_QUERY, data });

        return newToDoItem;
    },
    removeToDoItem: (_: any, { id }: RemoveToDoItemMutationArgs, { cache }: any) => {
        const cacheQuery = cache.readQuery({ query: GET_TODO_LIST_QUERY });

        const data: ToDoList = { toDoList: cacheQuery.toDoList.filter((item: ToDoItem) => item.id !== id) };
        cache.writeQuery({ query: GET_TODO_LIST_QUERY, data });

        return cacheQuery.toDoList;
    },
};

export default { Query, Mutation };
