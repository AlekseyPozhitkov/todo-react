import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/todos",
});

// Получить все задачи
export const getTodos = async () => {
  const response = await API.get("/");
  return response.data;
};

// Создать новую задачу
export const createTodo = async (task: string) => {
  const response = await API.post("/", { task });
  return response.data;
};

// Удалить задачу
export const deleteTodo = async (id: string) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};

// Обновить задачу
export const updateTodo = async (id: string, updates: { task?: string; completed?: boolean }) => {
  const response = await API.put(`/${id}`, updates);
  return response.data;
};
