import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './Components/TaskList/TaskList.js';
import AddTask from './Components/AddTask/AddTask.js';
import EditTask from './Components/EditTask/EditTask.js';
import NavBar from './Components/NavBar/NavBar.js';
import './App.css';
import Signup from './Components/Signup/Signup.js';
import Login from './Components/Login/Login.js';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
