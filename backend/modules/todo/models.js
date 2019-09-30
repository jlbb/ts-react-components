const { Schema, model } = require('mongoose');

const toDoItemSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
});

const toDoSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    toDoList: {
        type: [toDoItemSchema],
        required: true,
        default: []
    }
});
module.exports = {
    ToDo: model('todo', toDoSchema),
    ToDoItem: model('todoItem', toDoItemSchema)
};
