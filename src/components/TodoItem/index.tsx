import { RiCloseCircleLine } from "react-icons/ri";

interface ITodo {
  id: number;
  task: string;
  completed: boolean;
}

interface ITodoItem {
  todo: ITodo;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

export const TodoItem = ({ todo, toggleTask, removeTask }: ITodoItem) => {
  return (
    <div className={todo.completed ? "todo-row complete" : "todo-row"}>
      <div className="todo-row-main" onClick={() => toggleTask(todo.id)}>
        {todo.task}
      </div>
      <div className="iconsContainer">
        <RiCloseCircleLine onClick={() => removeTask(todo.id)} />
      </div>
    </div>
  );
};
