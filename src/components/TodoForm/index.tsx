import { ChangeEvent, FormEvent, useState } from "react";

interface ITodoForm {
  addTask: (task: string) => void;
}

export const TodoForm = ({ addTask }: ITodoForm) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTask(userInput);
    setUserInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="Add a new task..."
        onChange={handleChange}
        value={userInput}
      />
      <button className="todo-button">Save</button>
    </form>
  );
};
