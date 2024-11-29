import { ChangeEvent } from "react";

interface ITodoFilter {
  filter: string;
  setFilter: (value: string) => void;
}

export const TodoFilter = ({ filter, setFilter }: ITodoFilter) => {
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <select className="todo-filter" value={filter} onChange={handleFilterChange}>
      <option value="all">All Tasks</option>
      <option value="completed">Completed</option>
      <option value="incomplete">Incomplete</option>
    </select>
  );
};
