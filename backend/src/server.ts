import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Инициализация переменных окружения
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
const DB_URI = process.env.MONGO_URI || "your-default-mongo-uri";
mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Роут для проверки
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

console.log(DB_URI);

// Запуск сервера
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
