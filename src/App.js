import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.isCompleted ? "line-through" : "" }}
    >
      <form className="checkbox">
        <input
          type="checkbox"
          onClick={() => completeTask(index)}
          checked={task.isCompleted}
        />
      </form>
      {task.text}
      <div className="buttons">
        <button onClick={() => removeTask(index)}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            size="lg"
            className="icon-delete"
          />
        </button>
      </div>
    </div>
  );
}

function TaskForm({ addTask }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-task">
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [tasks, setTodos] = React.useState([
    {
      text: "Here is a to-do list",
      isCompleted: false
    },
    {
      text: "Add new tasks in the empty space below",
      isCompleted: false
    },
    {
      text: "And just press [Enter]",
      isCompleted: false
    }
  ]);

  const addTask = text => {
    const newTasks = [...tasks, { text }];
    setTodos(newTasks);
  };

  const completeTask = index => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTodos(newTasks);
  };

  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTodos(newTasks);
  };

  return (
    <div className="app">
      <div className="task-list">
        {tasks.map((task, index) => (
          <Task
            key={index}
            index={index}
            task={task}
            completeTask={completeTask}
            removeTask={removeTask}
          />
        ))}
        <TaskForm addTask={addTask} />
      </div>
    </div>
  );
}

export default App;
