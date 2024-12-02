import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { RiCheckFill, RiCloseCircleLine, RiEditLine } from "react-icons/ri";

interface ITodo {
  id: string;
  task: string;
  completed: boolean;
}

interface ITodoItem {
  todo: ITodo;
  toggleTask: (id: string, completed: boolean) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, updatedTask: string) => void;
}

export const TodoItem = ({ todo, toggleTask, removeTask, editTask }: ITodoItem) => {
  const [isEditing, setIsEditing] = useState(false);
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editableRef.current) {
      const newText = editableRef.current.textContent?.trim() || "";

      if (newText === "") {
        editableRef.current.focus();
        return;
      }

      editTask(todo.id, newText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      handleSave();
    }
  };

  let actionIcon;
  if (isEditing) {
    actionIcon = <RiCheckFill onClick={handleSave} />;
  } else {
    actionIcon = <RiEditLine onClick={() => setIsEditing(true)} />;
  }

  return (
    <div className={todo.completed ? "todo-row complete" : "todo-row"}>
      <div
        ref={editableRef}
        className={isEditing ? "todo-row-main editing" : "todo-row-main"}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onClick={() => {
          if (!isEditing) toggleTask(todo.id, !todo.completed);
        }}
        onKeyDown={isEditing ? handleKeyDown : undefined}
      >
        {todo.task}
      </div>
      <div className="iconsContainer">
        {actionIcon}
        <RiCloseCircleLine onClick={() => removeTask(todo.id)} />
      </div>
    </div>
  );
};
