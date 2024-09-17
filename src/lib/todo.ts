// Define the Todo type
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// Initialize the nextId counter
let nextId = 0;

// Create a new todo item
export function createTodo(text: string, completed: boolean = false): Todo {
    return {
        id: nextId++,
        text,
        completed,
    };
}

// Initial todos
export const initialTodos: Todo[] = [
    createTodo("Get apples", true),
    createTodo("Get oranges", true),
    createTodo("Get carrots"),
];
