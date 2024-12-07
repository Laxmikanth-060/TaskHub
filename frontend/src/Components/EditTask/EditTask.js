import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditTask.css';

function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/tasks/${id}`)
      .then(response => response.json())
      .then(data => setTask(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
      .then(() => navigate('/'));
  };

  return (
    <div className="container">
      <h2>Edit Task</h2>
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
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default EditTask;
