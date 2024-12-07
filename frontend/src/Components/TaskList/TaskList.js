import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [toggle,setToggle]=useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch tasks from backend when the component mounts
    fetchTasks();
  }, [toggle]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/tasks');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Parse JSON response
      setTasks(data); // Update state with fetched tasks
      setToggle(false);
    } catch (err) {
      console.error('Error while fetching tasks:', err);
    }
  };

  const deleteHandler= async(id)=>{


        fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(),
    })
      .then(() => {
        setToggle(true);
      })
      .catch(err=>console.log("error in deletion of task",err))

      
  }

  return (
    <div className="container">
      <h2>Task List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td className="actions">
                <Link to={`/edit-task/${task.id}`}>Edit</Link>
                <button onClick={()=>deleteHandler(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add-task">
        <button>Add Task</button>
      </Link>
    </div>
  );
}

export default TaskList;
