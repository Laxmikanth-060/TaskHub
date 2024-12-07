import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTask.css';

function AddTask() {
  const [task, setTask] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(() => navigate('/'));
  };

  return (
    <div className="container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Task Name</label>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
