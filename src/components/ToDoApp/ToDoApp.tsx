import React from 'react';
import bem from 'bera';
import ToDoList from '../ToDoList';
import InputForm from '../InputForm';
import { ToDo, ToDoItemInput, ToDoItemInputUpdate, Maybe } from '../../types/types';
import {
    useAddToDoMutation,
    useAddToDoItemMutation,
    useRemoveToDoItemMutation,
    useRemoveToDoMutation,
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
    const addToDo = useAddToDoMutation();
    const removeToDo = useRemoveToDoMutation();
    const addToDoItem = useAddToDoItemMutation();
    const removeToDoItem = useRemoveToDoItemMutation();
    const updateToDoItem = useUpdateToDoItemMutation();

    const handleAddToDo = async (name: string) => {
        await addToDo(name);
    };

    const handleRemoveToDo = async (id: string) => {
        await removeToDo(id);
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
                    <div className={componentClass('toDoContainer')} data-testid="toDoApp-fetchedData" key={toDo.id}>
                        <div className={componentClass('toDoControl')}>
                            <h3 className={'title'}>{toDo.name}</h3>
                            <span
                                className={`icon-box-remove ${componentClass('icon-removeItem')}`}
                                data-testid={`toDoApp-removeToDo-${toDo.id}`}
                                onClick={() => handleRemoveToDo(toDo.id)}
                            />
                        </div>
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

    // console.log('ToDos (data from ROOT_GET_TODO_LIST_QUERY)', toDos);

    return (
        <div className={componentClass()}>
            <h3>ToDoApp using React Hooks and GraphQL(with Apollo)</h3>
            <InputForm buttonLabel={'Create ToDo list'} formType={'create'} onSubmitForm={handleAddToDo} />
            {renderToDos()}
        </div>
    );
};

export default ToDoApp;
