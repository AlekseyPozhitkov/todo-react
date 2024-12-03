import { useEffect, useState } from "react";
import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import { TodoFilter } from "./components/TodoFilter";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./api/todoApi";
import { AxiosError } from "axios";

interface ITodo {
  id: string;
  task: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error);
        }
        console.error("Ошибка при загрузке задач:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTask = async (userInput: string) => {
    if (userInput) {
      try {
        const newTask = await createTodo(userInput);

        setTodos((prevTodos) => [...prevTodos, newTask]);
      } catch (error) {
        console.error("Ошибка при создании задачи:", error);
      }
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTodo(id);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      const updatedTask = await updateTodo(id, { completed });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedTask.completed } : todo
        )
      );
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    }
  };

  const editTask = async (id: string, updatedTask: string) => {
    try {
      const updatedTodo = await updateTodo(id, { task: updatedTask });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, task: updatedTodo.task } : todo))
      );
    } catch (error) {
      console.error("Ошибка при редактировании задачи:", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;

    return true;
  });

  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      <div className="header-container">
        <TodoForm addTask={addTask} />
        <TodoFilter filter={filter} setFilter={setFilter} />
      </div>

      <hr className="separator" />
      {error && <p>{error.message}</p>}
      {isLoading && <p>Loading...</p>}
      {!error && !isLoading && !filteredTodos.length && (
        <p style={{ fontSize: "3rem" }}>No tasks yet</p>
      )}
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
