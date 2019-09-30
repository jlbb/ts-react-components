// https://sysgears.com/articles/how-to-create-an-apollo-react-express-application/
// #1 Import the model created with mongoose
const {ToDo, ToDoItem} = require('./models');

const resolvers = {
    Query: {
        toDos: () => ToDo.find(),
        toDoItems: () => ToDoItem.find()
    },
    Mutation: {
        addToDo: (_, { name }) => {
            const newToDo = new ToDo({ name });
            newToDo.save();

            return newToDo
        },
        removeToDo: async (_, { id }) => {
            const removedToDo = await ToDo.findByIdAndRemove(id);
            removedToDo.save();

            return removedToDo;
        },
        updateToDo: async (_, { id, name }) => {
            const updatedToDo = await ToDo.findById(id);

            updatedToDo.name = name;
            updatedToDo.save();

            return updatedToDo;
        },
        addToDoItem: async (_, { idToDo, toDoItem }) => {
            const toDo = await ToDo.findById(idToDo);
            const newToDo = new ToDoItem(toDoItem);

            toDo.toDoList.push(newToDo);
            toDo.save();

            return newToDo;
        },
        removeToDoItem: async (_, { idToDo, idToDoItem }) => {
            const toDo = await ToDo.findById(idToDo);

            let removedToDoItem;
            toDo.toDoList = toDo.toDoList.reduce((acc, item) => {
                if (item.id === idToDoItem) {
                    removedToDoItem = item;
                    return acc
                }
                return [...acc, item]
            }, []);
            toDo.save();

            return removedToDoItem;
        },
        updateToDoItem: async (_, { idToDo, toDoItem }) => {
            const toDo = await ToDo.findById(idToDo);

            let updatedToDoItem = {};
            toDo.toDoList = toDo.toDoList.reduce((acc, item) => {
                if (item.id === toDoItem.id) {
                    updatedToDoItem = item;

                    // TODO Check recursive merge alternatives as lodash/merge
                    Object.assign(updatedToDoItem, toDoItem);
                    return [...acc, updatedToDoItem]
                }
                return [...acc, item]
            }, []);
            toDo.save();

            return updatedToDoItem;
        }
    }
};

module.exports = resolvers;