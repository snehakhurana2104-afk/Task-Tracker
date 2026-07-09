import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/dashboard.css";

import {
  Bell,
  Search,
  UserCircle,
  ClipboardList,
  Clock3,
  CheckCircle,
  Users,
} from "lucide-react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const [taskData, setTaskData] = useState({
    date: "",
    name: "Amit",
    status: "Pending",
    details: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  // ===========================
  // Fetch Tasks
  // ===========================

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ===========================
  // Handle Input
  // ===========================

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  // ===========================
  // Add Task
  // ===========================

  const handleAppend = async () => {

    if (
      !taskData.date ||
      !taskData.details ||
      !taskData.startTime
    ) {
      alert("Please fill required fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          date: taskData.date,
          name: taskData.name,
          task: taskData.details,
          timing: taskData.startTime,
          remarks: taskData.status,
          completedDate: taskData.endDate,
          completedTime: taskData.endTime,
          status: taskData.status,
        }
      );

      fetchTasks();

      setTaskData({
        date: "",
        name: "Amit",
        status: "Pending",
        details: "",
        startTime: "",
        endDate: "",
        endTime: "",
      });

      alert("Task Added Successfully");

    } catch (err) {

      console.log(err);
      alert("Failed");

    }
  };
    return (
    <div className="dashboard-wrapper">

      <main className="main-panel">

        {/* ---------- TOP NAVBAR ---------- */}

        <header className="top-navbar">

          <div className="navbar-left">
            <h2>Dashboard</h2>
            <p>Task Management System</p>
          </div>

          <div className="navbar-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search Tasks..."
            />
          </div>

          <div className="navbar-right">

            <Bell className="icon-btn" />

            <UserCircle className="icon-btn" />

            <div className="profile-box">
              <h4>Sneha</h4>
              <span>Administrator</span>
            </div>

          </div>

        </header>

        {/* ---------- HERO ---------- */}

        <section className="hero-section">

          <div>
            <h1>Welcome Back 👋</h1>

            <p>
              Manage your daily tasks efficiently.
            </p>
          </div>

        </section>

        {/* ---------- STATS ---------- */}

        <section className="stats-section">

          <div className="stat-card">
            <ClipboardList size={34} />
            <h3>Total Tasks</h3>
            <h2>{tasks.length}</h2>
          </div>

          <div className="stat-card pending">
            <Clock3 size={34} />
            <h3>Pending</h3>

            <h2>
              {
                tasks.filter(
                  (t) => t.remarks === "Pending"
                ).length
              }
            </h2>

          </div>

          <div className="stat-card completed">
            <CheckCircle size={34} />
            <h3>Completed</h3>

            <h2>
              {
                tasks.filter(
                  (t) => t.remarks === "Closed"
                ).length
              }
            </h2>

          </div>

          <div className="stat-card team">
            <Users size={34} />
            <h3>Team Members</h3>
            <h2>2</h2>
          </div>

        </section>

        {/* ---------- FORM ---------- */}

        <section className="task-form-box">

          <h2>Add New Task</h2>

          <div className="form-grid">

            <div className="input-group">
              <label>Date</label>

              <input
                type="date"
                name="date"
                value={taskData.date}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Name</label>

              <select
                name="name"
                value={taskData.name}
                onChange={handleChange}
              >
                <option>Amit</option>
                <option>Shivam</option>
              </select>

            </div>

            <div className="input-group">

              <label>Status</label>

              <select
                name="status"
                value={taskData.status}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>Closed</option>
                <option>Calls</option>
              </select>

            </div>

            <div className="input-group">

              <label>Strategic Details</label>

              <input
                type="text"
                name="details"
                placeholder="Enter task..."
                value={taskData.details}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>Start Time</label>

              <input
                type="time"
                name="startTime"
                value={taskData.startTime}
                onChange={handleChange}
              />

            </div>

            {(taskData.status === "Closed" ||
              taskData.status === "Calls") && (
              <>

                <div className="input-group">

                  <label>End Date</label>

                  <input
                    type="date"
                    name="endDate"
                    value={taskData.endDate}
                    onChange={handleChange}
                  />

                </div>

                <div className="input-group">

                  <label>End Time</label>

                  <input
                    type="time"
                    name="endTime"
                    value={taskData.endTime}
                    onChange={handleChange}
                  />

                </div>

              </>
            )}

          </div>

          <button
            className="submit-btn"
            onClick={handleAppend}
          >
            Add Task
          </button>

        </section>
                {/* ---------- TASK HISTORY ---------- */}

        <section className="history-box">

          <h2>Daily Task History</h2>

          <table className="styled-table">

            <thead>

              <tr>

                <th>Date</th>
                <th>Name</th>
                <th>Task</th>
                <th>Status</th>
                <th>Start Time</th>
                <th>End Date</th>
                <th>End Time</th>

              </tr>

            </thead>

            <tbody>

              {tasks.length > 0 ? (

                tasks.map((task, index) => (

                  <tr key={task._id || index}>

                    <td>{task.date}</td>

                    <td>{task.name}</td>

                    <td>{task.task}</td>

                    <td>

                      <span
                        className={
                          task.remarks === "Closed"
                            ? "status-completed"
                            : task.remarks === "Calls"
                            ? "status-calls"
                            : "status-pending"
                        }
                      >
                        {task.remarks}
                      </span>

                    </td>

                    <td>{task.timing}</td>

                    <td>{task.completedDate || "-"}</td>

                    <td>{task.completedTime || "-"}</td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No Tasks Available
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </section>

      </main>

    </div>

  );

};

export default Dashboard;