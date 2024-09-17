import { useState } from "react";
import { initialTodos, createTodo, Todo } from "@/lib/todo";

interface NewTodoProps {
  onAdd: (newTodo: Todo) => void;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [showActive, setShowActive] = useState<boolean>(false);

  // Calculate active and visible todos
  const activeTodos = todos.filter((todo) => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;

  const footer = <footer>{activeTodos.length} todos left</footer>;

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={(e) => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={(newTodo) => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>{todo.completed ? <s>{todo.text}</s> : todo.text}</li>
        ))}
      </ul>
      {footer}
    </>
  );
}

function NewTodo({ onAdd }: NewTodoProps) {
  const [text, setText] = useState<string>("");

  function handleAddClick() {
    if (text.trim()) {
      onAdd(createTodo(text));
      setText(""); // Clear input after adding
    }
  }

  return (
    <>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={handleAddClick}>Add</button>
    </>
  );
}
