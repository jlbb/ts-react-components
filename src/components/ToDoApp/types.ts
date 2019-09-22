interface TypeToDoItem {
    id: number;
    description: string;
}

interface TypeToDoList {
    toDoList: TypeToDoItem[];
}

export { TypeToDoItem, TypeToDoList };
