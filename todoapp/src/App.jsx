import React, { useContext, useState } from "react";

const App = () => {
  const TodoContext = React.createContext();

  function TodoProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
      if (task.trim()) {
        setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      }
    };

    const toggleTask = (id) => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    };

    const removeTask = (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
    };

    const clearCompleted = () => {
      setTasks(tasks.filter((task) => !task.completed));
    };

    return (
      <TodoContext.Provider
        value={{ tasks, addTask, toggleTask, removeTask, clearCompleted }}
      >
        {children}
      </TodoContext.Provider>
    );
  }

  function TaskInput() {
    const [input, setInput] = useState("");
    const { addTask } = useContext(TodoContext);

    const handleSubmit = (e) => {
      e.preventDefault();
      addTask(input);
      setInput("");
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
        />
        <button type="submit">Add</button>
      </form>
    );
  }

  function TaskList() {
    const { tasks, toggleTask, removeTask } = useContext(TodoContext);

    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    );
  }

  function ClearCompletedButton() {
    const { clearCompleted } = useContext(TodoContext);
    return <button onClick={clearCompleted}>Clear Completed</button>;
  }

  return (
    <div>
      <TodoProvider>
        <h1>To-Do App</h1>
        <TaskInput />
        <TaskList />
        <ClearCompletedButton />
      </TodoProvider>
    </div>
  );
};

export default App;
