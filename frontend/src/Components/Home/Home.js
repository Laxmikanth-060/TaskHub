import React from 'react';
import './App.css';
import TaskList from './components/TaskList/TaskList.js';
import AddTask from './components/AddTask/AddTask.js';

function Home() {
  return (
    <div className="App">
      <h1>Task Management</h1>
      <AddTask />
      <TaskList />
    </div>
  );
}

export default App;
