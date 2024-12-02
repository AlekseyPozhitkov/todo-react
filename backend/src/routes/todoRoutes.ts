import { Router, Request, Response } from "express";
import Todo from "../models/Todo";
import { taskDto } from "../dtos/taskDto";

const router = Router();

// Получение всех задач
router.get("/", async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    const todosDto = todos.map((todo) => taskDto(todo));

    res.status(200).json(todosDto);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos", error: err });
  }
});

// Создание задачи
router.post("/", async (req: Request, res: Response) => {
  const { task } = req.body;

  if (!task) {
    res.status(400).json({ message: "Task is required" });

    return;
  }

  try {
    const newTodo = new Todo({ task });
    const savedTodo = await newTodo.save();
    const savedTodoDto = taskDto(savedTodo);

    res.status(201).json(savedTodoDto);
  } catch (err) {
    res.status(500).json({ message: "Error creating todo", error: err });
  }
});

// Удаление задачи
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      res.status(404).json({ message: "Todo not found" });

      return;
    }

    const deletedTodoDto = taskDto(deletedTodo);

    res.status(200).json(deletedTodoDto);
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo", error: err });
  }
});

// Обновление задачи
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { task, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { task, completed }, { new: true });

    if (!updatedTodo) {
      res.status(404).json({ message: "Todo not found" });

      return;
    }

    const updatedTodoDto = taskDto(updatedTodo);

    res.status(200).json(updatedTodoDto);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo", error: err });
  }
});

export default router;
