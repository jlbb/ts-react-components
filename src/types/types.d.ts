export type Maybe<T> = T | null;

export interface ToDoItemInput {
    description: string;

    completed?: Maybe<boolean>;
}

export interface ToDoItemInputUpdate {
    id: string;

    description?: Maybe<string>;

    completed?: Maybe<boolean>;
}

export enum CacheControlScope {
    Public = 'PUBLIC',
    Private = 'PRIVATE',
}

/** The `Upload` scalar type represents a file upload. */
export type Upload = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
    toDos: (Maybe<ToDo>)[];

    toDoItems: (Maybe<ToDoItem>)[];
}

export interface ToDo {
    id: string;

    name: string;

    toDoList: (Maybe<ToDoItem>)[];
}

export interface ToDoItem {
    id: string;

    description: string;

    completed: boolean;
}

export interface Mutation {
    addToDo: ToDo;

    removeToDo: ToDo;

    updateToDo: ToDo;

    addToDoItem: ToDoItem;

    removeToDoItem: ToDoItem;

    updateToDoItem: ToDoItem;
}

export interface ToDos {
    toDos: (Maybe<ToDo>)[];
}

// ====================================================
// Arguments
// ====================================================

export interface AddToDoMutationArgs {
    name: string;
}
export interface RemoveToDoMutationArgs {
    id: string;
}
export interface UpdateToDoMutationArgs {
    id: string;

    name: string;
}
export interface AddToDoItemMutationArgs {
    idToDo: string;

    toDoItem: ToDoItemInput;
}
export interface RemoveToDoItemMutationArgs {
    idToDo: string;

    idToDoItem: string;
}
export interface UpdateToDoItemMutationArgs {
    idToDo: string;

    toDoItem: ToDoItemInputUpdate;
}

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
    parent: Parent,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo,
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
    subscribe<R = Result, P = Parent>(
        parent: P,
        args: Args,
        context: TContext,
        info: GraphQLResolveInfo,
    ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
    resolve?<R = Result, P = Parent>(
        parent: P,
        args: Args,
        context: TContext,
        info: GraphQLResolveInfo,
    ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<Result, Parent = {}, TContext = {}, Args = {}> =
    | ((...args: any[]) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
    | ISubscriptionResolverObject<Result, Parent, TContext, Args>;

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
    parent: Parent,
    context: TContext,
    info: GraphQLResolveInfo,
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
    next: NextResolverFn<TResult>,
    source: any,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
    export interface Resolvers<TContext = {}, TypeParent = {}> {
        toDos?: ToDosResolver<(Maybe<ToDo>)[], TypeParent, TContext>;

        toDoItems?: ToDoItemsResolver<(Maybe<ToDoItem>)[], TypeParent, TContext>;
    }

    export type ToDosResolver<R = (Maybe<ToDo>)[], Parent = {}, TContext = {}> = Resolver<R, Parent, TContext>;
    export type ToDoItemsResolver<R = (Maybe<ToDoItem>)[], Parent = {}, TContext = {}> = Resolver<R, Parent, TContext>;
}

export namespace ToDoResolvers {
    export interface Resolvers<TContext = {}, TypeParent = ToDo> {
        id?: IdResolver<string, TypeParent, TContext>;

        name?: NameResolver<string, TypeParent, TContext>;

        toDoList?: ToDoListResolver<(Maybe<ToDoItem>)[], TypeParent, TContext>;
    }

    export type IdResolver<R = string, Parent = ToDo, TContext = {}> = Resolver<R, Parent, TContext>;
    export type NameResolver<R = string, Parent = ToDo, TContext = {}> = Resolver<R, Parent, TContext>;
    export type ToDoListResolver<R = (Maybe<ToDoItem>)[], Parent = ToDo, TContext = {}> = Resolver<R, Parent, TContext>;
}

export namespace ToDoItemResolvers {
    export interface Resolvers<TContext = {}, TypeParent = ToDoItem> {
        id?: IdResolver<string, TypeParent, TContext>;

        description?: DescriptionResolver<string, TypeParent, TContext>;

        completed?: CompletedResolver<boolean, TypeParent, TContext>;
    }

    export type IdResolver<R = string, Parent = ToDoItem, TContext = {}> = Resolver<R, Parent, TContext>;
    export type DescriptionResolver<R = string, Parent = ToDoItem, TContext = {}> = Resolver<R, Parent, TContext>;
    export type CompletedResolver<R = boolean, Parent = ToDoItem, TContext = {}> = Resolver<R, Parent, TContext>;
}

export namespace MutationResolvers {
    export interface Resolvers<TContext = {}, TypeParent = {}> {
        addToDo?: AddToDoResolver<ToDo, TypeParent, TContext>;

        removeToDo?: RemoveToDoResolver<ToDo, TypeParent, TContext>;

        updateToDo?: UpdateToDoResolver<ToDo, TypeParent, TContext>;

        addToDoItem?: AddToDoItemResolver<ToDoItem, TypeParent, TContext>;

        removeToDoItem?: RemoveToDoItemResolver<ToDoItem, TypeParent, TContext>;

        updateToDoItem?: UpdateToDoItemResolver<ToDoItem, TypeParent, TContext>;
    }

    export type AddToDoResolver<R = ToDo, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, AddToDoArgs>;
    export interface AddToDoArgs {
        name: string;
    }

    export type RemoveToDoResolver<R = ToDo, Parent = {}, TContext = {}> = Resolver<
        R,
        Parent,
        TContext,
        RemoveToDoArgs
    >;
    export interface RemoveToDoArgs {
        id: string;
    }

    export type UpdateToDoResolver<R = ToDo, Parent = {}, TContext = {}> = Resolver<
        R,
        Parent,
        TContext,
        UpdateToDoArgs
    >;
    export interface UpdateToDoArgs {
        id: string;

        name: string;
    }

    export type AddToDoItemResolver<R = ToDoItem, Parent = {}, TContext = {}> = Resolver<
        R,
        Parent,
        TContext,
        AddToDoItemArgs
    >;
    export interface AddToDoItemArgs {
        idToDo: string;

        toDoItem: ToDoItemInput;
    }

    export type RemoveToDoItemResolver<R = ToDoItem, Parent = {}, TContext = {}> = Resolver<
        R,
        Parent,
        TContext,
        RemoveToDoItemArgs
    >;
    export interface RemoveToDoItemArgs {
        idToDo: string;

        idToDoItem: string;
    }

    export type UpdateToDoItemResolver<R = ToDoItem, Parent = {}, TContext = {}> = Resolver<
        R,
        Parent,
        TContext,
        UpdateToDoItemArgs
    >;
    export interface UpdateToDoItemArgs {
        idToDo: string;

        toDoItem: ToDoItemInputUpdate;
    }
}

export namespace ToDosResolvers {
    export interface Resolvers<TContext = {}, TypeParent = ToDos> {
        toDos?: ToDosResolver<(Maybe<ToDo>)[], TypeParent, TContext>;
    }

    export type ToDosResolver<R = (Maybe<ToDo>)[], Parent = ToDos, TContext = {}> = Resolver<R, Parent, TContext>;
}

export type CacheControlDirectiveResolver<Result> = DirectiveResolverFn<Result, CacheControlDirectiveArgs, {}>;
export interface CacheControlDirectiveArgs {
    maxAge?: Maybe<number>;

    scope?: Maybe<CacheControlScope>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<Result, SkipDirectiveArgs, {}>;
export interface SkipDirectiveArgs {
    /** Skipped when true. */
    if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<Result, IncludeDirectiveArgs, {}>;
export interface IncludeDirectiveArgs {
    /** Included when true. */
    if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<Result, DeprecatedDirectiveArgs, {}>;
export interface DeprecatedDirectiveArgs {
    /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
    reason?: string;
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<Upload, any> {
    name: 'Upload';
}

export type IResolvers<TContext = {}> = {
    Query?: QueryResolvers.Resolvers<TContext>;
    ToDo?: ToDoResolvers.Resolvers<TContext>;
    ToDoItem?: ToDoItemResolvers.Resolvers<TContext>;
    Mutation?: MutationResolvers.Resolvers<TContext>;
    ToDos?: ToDosResolvers.Resolvers<TContext>;
    Upload?: GraphQLScalarType;
} & { [typeName: string]: never };

export type IDirectiveResolvers<Result> = {
    cacheControl?: CacheControlDirectiveResolver<Result>;
    skip?: SkipDirectiveResolver<Result>;
    include?: IncludeDirectiveResolver<Result>;
    deprecated?: DeprecatedDirectiveResolver<Result>;
} & { [directiveName: string]: never };
