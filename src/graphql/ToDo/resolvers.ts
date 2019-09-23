import {
    AddToDoItemMutationArgs,
    MutationResolvers,
    QueryResolvers,
    RemoveToDoItemMutationArgs,
    ToDoItem,
} from '../../types/types';
import appState from '../initialState.json';
import { GET_TODO_LIST_QUERY } from '../queries';

const Query: QueryResolvers.Resolvers = {
    toDoList: () => appState.toDoList,
};

const Mutation: MutationResolvers.Resolvers = {
    addToDoItem: (_: any, { toDoItem }: AddToDoItemMutationArgs, { cache }: any) => {
        const cacheQuery = cache.readQuery({ query: GET_TODO_LIST_QUERY });
        const newToDoItem = { id: cacheQuery.toDoList.length + 1, ...toDoItem, __typename: 'ToDoItem' };

        const data = { toDoList: cacheQuery.toDoList.concat([newToDoItem]) };
        cache.writeQuery({ query: GET_TODO_LIST_QUERY, data });

        return newToDoItem;
    },
    removeToDoItem: (_: any, { id }: RemoveToDoItemMutationArgs, { cache }: any) => {
        const cacheQuery = cache.readQuery({ query: GET_TODO_LIST_QUERY });

        const data = { toDoList: cacheQuery.toDoList.filter((item: ToDoItem) => item.id !== id) };
        cache.writeQuery({ query: GET_TODO_LIST_QUERY, data });

        return cacheQuery.toDoItem;
    },
};

export default { Query, Mutation };
