import React, { useState } from 'react';

const TaskFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  // Yeh raha aapka Mock Data (Jab backend chalega, yahan API call aayega)
  const tasks = [
    { id: 1, title: 'Database Design', status: 'Completed' },
    { id: 2, title: 'React UI', status: 'Pending' },
    { id: 3, title: 'Auth API', status: 'Pending' }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ padding: '20px' }}>
      <input 
        type="text" 
        placeholder="Search tasks..." 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>{task.title} - {task.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskFilter;