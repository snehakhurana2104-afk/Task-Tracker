import React, { useState } from "react";
import axios from "axios";
import "../assets/css/operation.css";

import {
  Search,
  Filter,
  Pencil,
  Trash2,
  Save,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from "lucide-react";

const Operation = ({ tasks = [], setTasks }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  const tasksPerPage = 10;

  // =========================
  // Sorting
  // =========================

  const handleSort = (key) => {

    let direction = "desc";

    if (
      sortConfig.key === key &&
      sortConfig.direction === "desc"
    ) {
      direction = "asc";
    }

    setSortConfig({
      key,
      direction,
    });

  };

  // =========================
  // Search + Filter
  // =========================

  const filteredTasks = (tasks || []).filter((task) => {

    const matchesSearch =

      task.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())

      ||

      task.task
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter =

      filter === "All"

      ||

      task.remarks === filter;

    return matchesSearch && matchesFilter;

  });

  // =========================
  // Sort Data
  // =========================

  const sortedTasks = [...filteredTasks].sort((a, b) => {

    if (a[sortConfig.key] < b[sortConfig.key]) {

      return sortConfig.direction === "asc"
        ? -1
        : 1;

    }

    if (a[sortConfig.key] > b[sortConfig.key]) {

      return sortConfig.direction === "asc"
        ? 1
        : -1;

    }

    return 0;

  });

  // =========================
  // Pagination
  // =========================

  const indexOfLastTask = currentPage * tasksPerPage;

  const indexOfFirstTask =
    indexOfLastTask - tasksPerPage;

  const currentTasks =
    sortedTasks.slice(
      indexOfFirstTask,
      indexOfLastTask
    );

  const totalPages = Math.ceil(
    filteredTasks.length / tasksPerPage
  );

  // =========================
  // Edit
  // =========================

  const handleEdit = (task) => {

    setEditingId(task._id);

    setEditData({
      ...task,
    });

  };

  // =========================
  // Save
  // =========================

  const handleSave = async (id) => {

    try {

      await axios.put(

        `http://localhost:5000/api/tasks/${id}`,

        editData

      );

      setTasks(

        tasks.map((item) =>

          item._id === id

            ? editData

            : item

        )

      );

      setEditingId(null);

    }

    catch (err) {

      alert("Unable to save task.");

    }

  };

  // =========================
  // Delete
  // =========================

  const handleDelete = async (id) => {

    try {

      await axios.delete(

        `http://localhost:5000/api/tasks/${id}`

      );

      setTasks(

        tasks.filter(
          (item) => item._id !== id
        )

      );

    }

    catch (err) {

      alert("Unable to delete task.");

    }

  };
    // =========================
  // UI
  // =========================

  return (
    <div className="operation-container">

      {/* Header */}

      <div className="operation-header">

        <div>

          <h1>
            <ClipboardList size={30} />
            Operations
          </h1>

          <p>
            Manage all employee tasks efficiently
          </p>

        </div>

      </div>

      {/* Search & Filter */}

      <div className="filter-section">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            className="search-input"
            placeholder="Search employee or task..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

        <div className="filter-box">

          <Filter size={18} />

          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In-Process">In-Process</option>
            <option value="Completed">Completed</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="table-wrapper">

        <table className="operation-table">

          <thead>

            <tr>

              <th onClick={() => handleSort("date")}>Date ↕</th>

              <th onClick={() => handleSort("name")}>Employee ↕</th>

              <th onClick={() => handleSort("task")}>Task ↕</th>

              <th>Timing</th>

              <th>Status</th>

              <th>Completed Date</th>

              <th>Completed Time</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {currentTasks.length > 0 ? (

              currentTasks.map((task) => (

                <tr key={task._id}>

                  <td>{task.date}</td>

                  <td>{task.name}</td>

                  <td>{task.task}</td>

                  <td>{task.timing}</td>

                  <td>

                    {editingId === task._id ? (

                      <select
                        className="edit-input"
                        value={editData.remarks}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            remarks: e.target.value,
                          })
                        }
                      >
                        <option>Pending</option>
                        <option>In-Process</option>
                        <option>Completed</option>
                      </select>

                    ) : (

                      <span
                        className={
                          task.remarks === "Completed"
                            ? "status completed"
                            : task.remarks === "In-Process"
                            ? "status process"
                            : "status pending"
                        }
                      >
                        {task.remarks}
                      </span>

                    )}

                  </td>

                  <td>{task.completedDate || "--"}</td>

                  <td>{task.completedTime || "--"}</td>

                  <td>

                    <div className="action-cell">

                      {editingId === task._id ? (

                        <button
                          className="btn-save"
                          onClick={() => handleSave(task._id)}
                        >
                          <Save size={16} />
                          Save
                        </button>

                      ) : (

                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(task)}
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                      )}

                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(task._id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="empty-row"
                >
                  No Tasks Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className="pagination-controls">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          <ChevronLeft size={18} />
          Prev
        </button>

        <div className="page-number">

          Page <strong>{currentPage}</strong> of{" "}
          <strong>{totalPages || 1}</strong>

        </div>

        <button
          disabled={
            currentPage >= totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
};

export default Operation;