import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/dashboard.css";

import {
  Search,
  UserCircle,
  ClipboardList,
  Clock3,
  CheckCircle,
  Users,
  PlusCircle,
  RefreshCw,
  Download,
} from "lucide-react";

// ===========================================
// DASHBOARD COMPONENT
// ===========================================

const Dashboard = ({
  tasks = [],
  setTasks,
  recentTasks,
  setRecentTasks,
  fetchTasks: parentFetchTasks,
  darkMode,
}) => {
  // ===========================================
  // STATES
  // ===========================================

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);

  const [taskData, setTaskData] = useState({
    date: "",
    name: "",
    task: "",
    timing: "",
    remarks: "Pending",
  });

  // ===========================================
  // FETCH TASKS
  // ===========================================

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      // MongoDB array safely nikalo
      const dbTasks = Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setTasks(dbTasks);

      // Latest 5 Tasks
      if (setRecentTasks) {
        setRecentTasks([...dbTasks].slice(-5).reverse());
      }
    } catch (error) {
      console.error("Fetch Tasks Error:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // ===========================================
  // LOAD DATA
  // ===========================================

  useEffect(() => {
    if (parentFetchTasks) {
      parentFetchTasks();
    } else {
      fetchTasks();
    }
  }, []);
    // ===========================================
  // HANDLE INPUT
  // ===========================================

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  // ===========================================
  // ADD TASK
  // ===========================================

  const addTask = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/tasks",
        taskData
      );

      // Reset Form
      setTaskData({
        date: "",
        name: "",
        task: "",
        timing: "",
        remarks: "Pending",
      });

      // Refresh Tasks
      if (parentFetchTasks) {
        await parentFetchTasks();
      } else {
        await fetchTasks();
      }

      alert("✅ Task Added Successfully");

    } catch (error) {
      console.error("Add Task Error:", error);
      alert("❌ Failed to Add Task");
    } finally {
      setLoading(false);
    }
  };
    // ===========================================
  // SEARCH FILTER (SAFE)
  // ===========================================

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const filteredTasks = safeTasks.filter((item) => {
    const employee = (item.name || "").toLowerCase();
    const task = (item.task || "").toLowerCase();

    return (
      employee.includes(searchTerm.toLowerCase()) ||
      task.includes(searchTerm.toLowerCase())
    );
  });

  // ===========================================
  // DASHBOARD COUNTS
  // ===========================================

  const totalTasks = safeTasks.length;

  const completedTasks = safeTasks.filter(
    (item) =>
      item.remarks === "Completed" ||
      item.remarks === "Closed"
  ).length;

  const pendingTasks = safeTasks.filter(
    (item) =>
      item.remarks !== "Completed" &&
      item.remarks !== "Closed"
  ).length;

  const inProcessTasks = safeTasks.filter(
    (item) => item.remarks === "In-Process"
  ).length;

  // ===========================================
  // COMPLETION %
  // ===========================================

  const completionRate =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  // ===========================================
  // RECENT TASKS
  // ===========================================

  const latestTasks =
    recentTasks && recentTasks.length > 0
      ? recentTasks
      : [...safeTasks].slice(-5).reverse();
        return (
    <div className={darkMode ? "dashboard dark" : "dashboard"}>

      {/* ===========================
          NAVBAR
      ============================ */}

      <div className="dashboard-navbar">

        <div className="search-box">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search employee or task..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

        <div className="profile">

          <UserCircle size={36} />

          <div className="profile-info">
            <h4>Admin</h4>
            <span>Strategy & Operations</span>
          </div>

        </div>

      </div>

      {/* ===========================
          HERO SECTION
      ============================ */}

      <div className="hero">

        <div>

          <h1>Welcome Back 👋</h1>

          <p>
            Manage your team's productivity and monitor daily operations
            from one place.
          </p>

        </div>

        <button
          className="refresh-btn"
          onClick={parentFetchTasks ? parentFetchTasks : fetchTasks}
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      {/* ===========================
          STAT CARDS
      ============================ */}

      <div className="stats-container">

        <div className="stat-card">

          <ClipboardList size={34} />

          <div>

            <h2>{totalTasks}</h2>

            <p>Total Tasks</p>

          </div>

        </div>

        <div className="stat-card">

          <Clock3 size={34} />

          <div>

            <h2>{pendingTasks}</h2>

            <p>Pending Tasks</p>

          </div>

        </div>

        <div className="stat-card">

          <CheckCircle size={34} />

          <div>

            <h2>{completedTasks}</h2>

            <p>Completed Tasks</p>

          </div>

        </div>

        <div className="stat-card">

          <Users size={34} />

          <div>

            <h2>{completionRate}%</h2>

            <p>Completion Rate</p>

          </div>

        </div>

      </div>
            {/* ===========================
          ADD TASK SECTION
      ============================ */}

      <div className="task-form-section">

        <div className="section-title">
          <h2>Add New Task</h2>
          <p>Create and assign a new task to your team.</p>
        </div>

        <form
          className="task-form"
          onSubmit={addTask}
        >

          <input
            type="date"
            name="date"
            value={taskData.date}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={taskData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="task"
            placeholder="Task Description"
            value={taskData.task}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="timing"
            placeholder="Timing (Ex: 10:30 AM)"
            value={taskData.timing}
            onChange={handleChange}
          />

          <select
            name="remarks"
            value={taskData.remarks}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In-Process">In-Process</option>
            <option value="Completed">Completed</option>
            <option value="Closed">Closed</option>
          </select>

          <button
            type="submit"
            disabled={loading}
          >
            <PlusCircle size={18} />

            {loading ? "Saving..." : "Add Task"}

          </button>

        </form>

      </div>
            {/* ===========================
          TASK HISTORY
      ============================ */}

      <div className="table-section">

        <div className="table-header">

          <h2>Task History</h2>

          <button className="download-btn">
            <Download size={18} />
            Export
          </button>

        </div>

        {loading ? (

          <div className="loading-box">
            <h3>Loading Tasks...</h3>
          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>Date</th>

                <th>Employee</th>

                <th>Task</th>

                <th>Timing</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {filteredTasks.length > 0 ? (

                filteredTasks.map((item, index) => (

                  <tr key={item._id || index}>

                    <td>{item.date}</td>

                    <td>{item.name}</td>

                    <td>{item.task}</td>

                    <td>{item.timing}</td>

                    <td>

                      <span
                        className={
                          item.remarks === "Completed" ||
                          item.remarks === "Closed"
                            ? "status completed"
                            : item.remarks === "In-Process"
                            ? "status process"
                            : "status pending"
                        }
                      >
                        {item.remarks}
                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "25px",
                    }}
                  >
                    No Tasks Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        )}

      </div>

      {/* ===========================
          RECENT TASKS
      ============================ */}

      {latestTasks.length > 0 && (

        <div className="table-section">

          <div className="table-header">

            <h2>Latest 5 Tasks</h2>

          </div>

          <table>

            <thead>

              <tr>

                <th>Employee</th>

                <th>Task</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {latestTasks.map((item, index) => (

                <tr key={item._id || index}>

                  <td>{item.name}</td>

                  <td>{item.task}</td>

                  <td>{item.remarks}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default Dashboard;