export type Maybe<T> = T | null;

export interface ToDoItemInput {
    id?: Maybe<string>;

    description: string;

    completed?: Maybe<boolean>;
}

// ====================================================
// Types
// ====================================================

export interface Query {
    toDoList: (Maybe<ToDoItem>)[];
}

export interface ToDoItem {
    id: string;

    description: string;

    completed: boolean;
}

export interface Mutation {
    addToDoItem: ToDoItem;

    removeToDoItem: ToDoItem;

    updateToDoItem: ToDoItem;
}

export interface ToDoList {
    toDoList: (Maybe<ToDoItem>)[];
}

// ====================================================
// Arguments
// ====================================================

export interface AddToDoItemMutationArgs {
    toDoItem: ToDoItemInput;
}
export interface RemoveToDoItemMutationArgs {
    id: string;
}
export interface UpdateToDoItemMutationArgs {
    toDoItem: ToDoItemInput;
}

import { GraphQLResolveInfo } from 'graphql';

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
        toDoList?: ToDoListResolver<(Maybe<ToDoItem>)[], TypeParent, TContext>;
    }

    export type ToDoListResolver<R = (Maybe<ToDoItem>)[], Parent = {}, TContext = {}> = Resolver<R, Parent, TContext>;
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
        addToDoItem?: AddToDoItemResolver<ToDoItem, TypeParent, TContext>;

        removeToDoItem?: RemoveToDoItemResolver<ToDoItem, TypeParent, TContext>;

        updateToDoItem?: UpdateToDoItemResolver<ToDoItem, TypeParent, TContext>;
    }

    export type AddToDoItemResolver<R = ToDoItem, Parent = {}, TContext = {}> = Resolver<
        R,
        Parent,
        TContext,
        AddToDoItemArgs
    >;
    export interface AddToDoItemArgs {
        toDoItem: ToDoItemInput;
    }

    export type RemoveToDoItemResolver<R = ToDoItem, Parent = {}, TContext = {}> = Resolver<
        R,
        Parent,
        TContext,
        RemoveToDoItemArgs
    >;
    export interface RemoveToDoItemArgs {
        id: string;
    }

    export type UpdateToDoItemResolver<R = ToDoItem, Parent = {}, TContext = {}> = Resolver<
        R,
        Parent,
        TContext,
        UpdateToDoItemArgs
    >;
    export interface UpdateToDoItemArgs {
        toDoItem: ToDoItemInput;
    }
}

export namespace ToDoListResolvers {
    export interface Resolvers<TContext = {}, TypeParent = ToDoList> {
        toDoList?: ToDoListResolver<(Maybe<ToDoItem>)[], TypeParent, TContext>;
    }

    export type ToDoListResolver<R = (Maybe<ToDoItem>)[], Parent = ToDoList, TContext = {}> = Resolver<
        R,
        Parent,
        TContext
    >;
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

export type IResolvers<TContext = {}> = {
    Query?: QueryResolvers.Resolvers<TContext>;
    ToDoItem?: ToDoItemResolvers.Resolvers<TContext>;
    Mutation?: MutationResolvers.Resolvers<TContext>;
    ToDoList?: ToDoListResolvers.Resolvers<TContext>;
} & { [typeName: string]: never };

export type IDirectiveResolvers<Result> = {
    skip?: SkipDirectiveResolver<Result>;
    include?: IncludeDirectiveResolver<Result>;
    deprecated?: DeprecatedDirectiveResolver<Result>;
} & { [directiveName: string]: never };
