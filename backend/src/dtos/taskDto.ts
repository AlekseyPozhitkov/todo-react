import { ITodo } from "../models/Todo";

export const taskDto = ({ _id, task, completed }: ITodo) => {
  return {
    id: _id,
    task,
    completed,
  };
};
