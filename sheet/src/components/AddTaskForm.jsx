import React, { useState } from 'react';
import axios from 'axios';
import logo from "../assets/ssdn-logo.png";

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!title.trim()) return alert("Task title cannot be empty!");
    await axios.post('http://localhost:5000/api/tasks', { title, status: 'Pending' });
    setTitle(''); 
    onTaskAdded(); 
  } catch(err) {
    alert("Error adding task!");
  }
};


  return (
    <div className="page-logo">
  <img src={logo} alt="SSDN Technologies" />

    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Task Title" required
        />
      <button type="submit">Add Task</button>
    </form>
    </div>
  );
};

export default AddTaskForm;







