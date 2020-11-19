import { useState } from "react";
import useTodos from "./useTodos";

const useFilter = () => {
  const { setTodos } = useTodos();
  const [filter, setFilter] = useState("");

  const showAllTodo = () => setFilter("");
  const showDoneTodo = () => setFilter("done");
  const showUnfinishTodo = () => setFilter("unfinish");
  const clearAll = () => setTodos([]);

  return {
    filter,
    setFilter,
    showAllTodo,
    showDoneTodo,
    showUnfinishTodo,
    clearAll,
  };
};

export default useFilter;
