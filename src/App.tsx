import { useState } from "react";
import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import { TodoFilter } from "./components/TodoFilter";

interface ITodo {
  id: number;
  task: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState("all");

  const addTask = (userInput: string): void => {
    if (userInput) {
      const newTask = {
        id: Date.now(),
        task: userInput,
        completed: false,
      };

      setTodos([...todos, newTask]);
    }
  };

  const removeTask = (id: number): void => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const toggleTask = (id: number): void => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo }
      ),
    ]);
  };

  const editTask = (id: number, updatedTask: string): void => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, task: updatedTask } : todo)));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true; // "all" показывает все задачи
  });

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="header-container">
        <TodoForm addTask={addTask} />
        <TodoFilter filter={filter} setFilter={setFilter} />
      </div>
      <hr className="separator" />
      {filteredTodos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          removeTask={removeTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default App;
