import { ChangeEvent } from "react";

interface ISortSelectProps {
  sort: string;
  setSort: (value: string) => void;
}

export const TodoFilter = ({ sort, setSort }: ISortSelectProps) => {
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  return (
    <select className="todo-filter" value={sort} onChange={handleSortChange}>
      <option value="date">Sort by Date</option>
      <option value="task">Sort by Name</option>
    </select>
  );
};
