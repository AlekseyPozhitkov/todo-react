import { useState } from "react";
import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import { TodoFilter } from "./components/TodoFilter";

interface ITodo {
  id: number;
  task: string;
  completed: boolean;
  date: number;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [sort, setSort] = useState("date");

  const addTask = (userInput: string): void => {
    if (userInput) {
      const newTask = {
        id: Date.now(),
        task: userInput,
        completed: false,
        date: Date.now(),
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

  const sortedTodos = todos.sort((a, b) => {
    if (sort === "task") {
      return a.task.localeCompare(b.task);
    } else {
      return a.date - b.date;
    }
  });

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="header-container">
        <TodoForm addTask={addTask} />
        <TodoFilter sort={sort} setSort={setSort} />
      </div>
      <hr className="separator" />
      {sortedTodos.map((todo) => (
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
