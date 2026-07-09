import React, { useState } from 'react';
import axios from 'axios';
import "../assets/css/operation.css";

const Operation = ({ tasks, setTasks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const tasksPerPage = 10;

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'asc';
    setSortConfig({ key, direction });
  };
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.task?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || task.remarks === filter;
    return matchesSearch && matchesFilter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditData({ ...task });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, editData);
      setTasks(tasks.map(t => t._id === id ? editData : t));
      setEditingId(null);
    } catch (err) { alert("Error saving data"); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) { alert("Error deleting data"); }
  };
  return (
    <div className="operation-container">
      <h2 className="section-title">Current Tasks</h2>
      <div className="filter-section">
        <input type="text" placeholder="Search task..." className="search-input" onChange={(e) => setSearchTerm(e.target.value)} />
        <select className="filter-select" onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="In-Process">In-Process</option>
          <option value="Closed">Closed</option>
          <option value="Pending (Awaiting Client)">Pending</option>
        </select>
      </div>

      <table className="operation-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('date')}>Date ↕</th>
            <th onClick={() => handleSort('name')}>Name ↕</th>
            <th onClick={() => handleSort('task')}>Task ↕</th>
            <th>Timing</th><th>Remarks</th><th>Comp. Date</th><th>Comp. Time</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task._id}>
              <td>{task.date}</td><td>{task.name}</td><td>{task.task}</td><td>{task.timing}</td>
              <td>
                {editingId === task._id ? (
                  <input className="edit-input" value={editData.remarks} onChange={(e) => setEditData({...editData, remarks: e.target.value})} />
                ) : (task.remarks)}
              </td>
              <td>{task.completedDate || '-'}</td>
              <td>{task.completedTime || '-'}</td>
              <td className="action-cell">
                {editingId === task._id ? (
                  <button className="btn-save" onClick={() => handleSave(task._id)}>Save</button>
                ) : (
                  <button className="btn-edit" onClick={() => handleEdit(task)}>Edit</button>
                )}
                <button className="btn-delete" onClick={() => handleDelete(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        <span>Page {currentPage} of {totalPages || 1}</span>
        <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};
export default Operation;