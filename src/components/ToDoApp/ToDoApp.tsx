import React from 'react';
import bem from 'bera';
import ToDoList from '../ToDoList';
import InputForm from '../InputForm';
import { ToDo, ToDoItemInput, ToDoItemInputUpdate, Maybe } from '../../types/types';
import {
    useAddToDo,
    useAddToDoItemMutation,
    useRemoveToDoItemMutation,
    useToDosQuery,
    useUpdateToDoItemMutation,
} from '../../graphql/ToDo/hooks';

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
    const toDos = useToDosQuery();
    const addToDo = useAddToDo();
    const addToDoItem = useAddToDoItemMutation();
    const removeToDoItem = useRemoveToDoItemMutation();
    const updateToDoItem = useUpdateToDoItemMutation();

    const handleAddToDo = async (name: string) => {
        await addToDo(name);
    };

    const handleAddToDoItem = async (idToDo: string, value: string) => {
        const toDoItem: ToDoItemInput = {
            description: value,
        };
        await addToDoItem(idToDo, toDoItem);
    };

    const handleRemoveToDoItem = async (idToDo: string, idToDoItem: string) => {
        await removeToDoItem(idToDo, idToDoItem);
    };

    const handleUpdateToDoItem = async (idToDo: string, toDoItem: ToDoItemInputUpdate) => {
        await updateToDoItem(idToDo, toDoItem);
    };

    const renderToDos = () => {
        if (!toDos) {
            return null;
        }

        return toDos.map(
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

    console.log('TODO (data from ROOT_GET_TODO_LIST_QUERY)', toDos);

    return (
        <div className={componentClass()}>
            <h3>ToDoApp using Hooks and GraphQL(with Apollo)</h3>
            <InputForm buttonLabel={'Create ToDo list'} onSubmitForm={handleAddToDo} />
            {renderToDos()}
        </div>
    );
};

export default ToDoApp;
