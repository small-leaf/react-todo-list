import { useState, useEffect } from "react";
import useInput from "./useInput";

const writeTodosToLocalStorage = (todos) => {
  window.localStorage.setItem("todos", JSON.stringify(todos));
};

let id = 1;
const useTodos = () => {
  const { value, setValue, handleInputChange } = useInput();
  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem("todos") || "";
    if (todoData) {
      todoData = JSON.parse(todoData);
      id = todoData[0].id + 1;
    } else {
      todoData = [];
    }
    return todoData;
  });

  useEffect(() => {
    writeTodosToLocalStorage(todos);
  }, [todos]);

  const handleCheckBoxChange = (id) => {
    return () => {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        })
      );
    };
  };

  const handleButtonClick = () => {
    if (value.trim() !== "") {
      setTodos([
        {
          id,
          content: value,
          isDone: false,
        },
        ...todos,
      ]);
      setValue("");
      id++;
    }
  };

  const handleButtonKeyDown = (e) => {
    if (value.trim() !== "" && e.keyCode === 13) {
      handleButtonClick();
    }
  };

  const handleDeleteTodo = (id) => {
    return () => {
      setTodos(todos.filter((todo) => todo.id !== id));
    };
  };

  return {
    value,
    setValue,
    todos,
    setTodos,
    handleInputChange,
    handleCheckBoxChange,
    handleButtonClick,
    handleButtonKeyDown,
    handleDeleteTodo,
  };
};

export default useTodos;
