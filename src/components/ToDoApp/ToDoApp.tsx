import React from 'react';
import bem from 'bera';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ToDoList from '../ToDoList';
import InputForm from '../InputForm';
import { ADD_TODO, ROOT_GET_TODO_LIST_QUERY } from '../../graphql/ToDo/mutations';
import { ADD_TODO_ITEM, REMOVE_TODO_ITEM, UPDATE_TODO_ITEM } from '../../graphql/ToDo/mutations';
import { ToDos, ToDo, ToDoItem, ToDoItemInput, ToDoItemInputUpdate, Maybe } from '../../types/types';
// import { ToDo, ToDoItem, ToDoItemInput } from '../../types/types';

const componentClass = bem('toDoApp');

const defaultToDo = {
    toDoList: [
        {
            id: '1',
            description: '',
            completed: false,
        },
    ],
};

const ToDoApp = () => {
    const { data: toDoData } = useQuery<ToDos>(ROOT_GET_TODO_LIST_QUERY);
    const [addToDo] = useMutation<ToDo>(ADD_TODO);
    const [addToDoItem] = useMutation<ToDoItem>(ADD_TODO_ITEM);
    const [removeToDoItem] = useMutation<ToDoItem>(REMOVE_TODO_ITEM);
    const [updateToDoItem] = useMutation<ToDoItem>(UPDATE_TODO_ITEM);

    const handleAddToDo = async (name: string) => {
        await addToDo({ variables: { name } });
    };

    const handleAddToDoItem = async (idToDo: string, value: string) => {
        const toDoItem: ToDoItemInput = {
            description: value,
        };
        await addToDoItem({ variables: { idToDo, toDoItem } });
    };

    const handleRemoveToDoItem = async (idToDo: string, idToDoItem: string) => {
        await removeToDoItem({ variables: { idToDo, idToDoItem } });
    };

    const handleUpdateToDoItem = async (idToDo: string, toDoItem: ToDoItemInputUpdate) => {
        await updateToDoItem({ variables: { idToDo, toDoItem } });
    };

    const renderToDos = () => {
        console.log('toDoData', toDoData, toDoData && toDoData.toDos[0]);
        if (!toDoData || !toDoData.toDos) {
            return null;
        }

        return toDoData.toDos.map(
            (toDo: Maybe<ToDo>) =>
                toDo && (
                    <div className={componentClass('toDoContainer')} key={toDo.id}>
                        <h3 className={'title'}>{toDo.name}</h3>
                        <InputForm
                            buttonLabel={'Add ToDo item'}
                            onSubmitForm={(value: string) => handleAddToDoItem(toDo.id, value)}
                        />
                        <ToDoList
                            todo={!toDo.toDoList ? defaultToDo.toDoList : toDo.toDoList}
                            onRemoveToDo={(idToDoItem: string) => handleRemoveToDoItem(toDo.id, idToDoItem)}
                            onUpdateToDo={(toDoItem: ToDoItemInputUpdate) => handleUpdateToDoItem(toDo.id, toDoItem)}
                        />
                    </div>
                ),
        );
    };

    console.log('TODO (data from ROOT_GET_TODO_LIST_QUERY)', toDoData);

    // TODO useQuery needs to support a list of ToDo (change also backend)

    return (
        <div className={componentClass()}>
            <h3>ToDoApp using Hooks and GraphQL(with Apollo)</h3>
            <InputForm buttonLabel={'Create ToDo list'} onSubmitForm={handleAddToDo} />
            {renderToDos()}
        </div>
    );
};

export default ToDoApp;
