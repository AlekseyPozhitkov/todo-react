import { useState } from "react";
import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";

interface ITodo {
  id: number;
  task: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);

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

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <TodoForm addTask={addTask} />
      <hr className="separator" />
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} removeTask={removeTask} toggleTask={toggleTask} />
      ))}
    </div>
  );
}

export default App;
