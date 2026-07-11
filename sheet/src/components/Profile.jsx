import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaUserCircle,
  FaTasks,
  FaChartLine,
  FaDownload,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import "../assets/css/profile.css";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
];

function Profile({ profileData = [] }) {

  const navigate = useNavigate();
  const { name } = useParams();

  // ==========================
  // Selected Employee
  // ==========================

  const employee = useMemo(() => {

    if (!profileData || profileData.length === 0) {
      return null;
    }

    if (!name) {
      return profileData[0];
    }

    return (
      profileData.find(
        (emp) =>
          emp.name?.trim().toLowerCase() ===
          decodeURIComponent(name)
            .trim()
            .toLowerCase()
      ) || null
    );

  }, [profileData, name]);

  console.log("Profile Data :", profileData);
  console.log("Employee :", employee);

  if (!employee) {
    return (
      <div className="profile-container">

        <div className="no-profile">

          <h2>Employee Not Found</h2>

          <button
            className="back-btn"
            onClick={() => navigate("/team")}
          >
            <FaArrowLeft />
            <span>Back To Team</span>
          </button>

        </div>

      </div>
    );
  }

  // ==========================
  // Chart Data
  // ==========================

  const completedTasks =
    employee.tasks?.filter(
      (task) => task.remarks === "Closed"
    ).length || 0;

  const pendingTasks =
    employee.tasks?.filter(
      (task) => task.remarks !== "Closed"
    ).length || 0;

  const totalTasks =
    employee.tasks?.length || 0;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  const pieData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
  ];

  const priorityData = [
    {
      priority: "High",
      tasks:
        employee.tasks?.filter(
          (task) => task.priority === "High"
        ).length || 0,
    },
    {
      priority: "Medium",
      tasks:
        employee.tasks?.filter(
          (task) => task.priority === "Medium"
        ).length || 0,
    },
    {
      priority: "Low",
      tasks:
        employee.tasks?.filter(
          (task) => task.priority === "Low"
        ).length || 0,
    },
  ];

  return (

    <div className="profile-container">
            {/* ========================= */}
      {/* Back Button */}
      {/* ========================= */}

      <button
        className="back-btn"
        onClick={() => navigate("/team")}
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      {/* ========================= */}
      {/* Page Header */}
      {/* ========================= */}

      <div className="profile-header">

        <div>

          <h1>Employee Profile</h1>

          <p>
            View employee details, analytics and performance dashboard.
          </p>

        </div>

      </div>

      {/* ========================= */}
      {/* Employee Cards */}
      {/* ========================= */}

      <div className="employee-grid">

        {profileData.map((emp) => (

          <div
            key={emp.name}
            className={`employee-card ${
              emp.name === employee.name ? "active" : ""
            }`}
            onClick={() =>
              navigate(`/profile/${encodeURIComponent(emp.name)}`)
            }
          >

            <div className="employee-avatar">
              <FaUserCircle />
            </div>

            <div className="employee-content">

              <h3>{emp.name}</h3>

              <p>
                {emp.department || "Department"}
              </p>

              <div className="employee-footer">

                <FaTasks />

                <span>
                  {emp.tasks?.length || 0} Tasks
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* ========================= */}
      {/* Profile Dashboard */}
      {/* ========================= */}

      <div className="profile-dashboard">

        {/* Left Profile Card */}

        <div className="profile-card">

          <div className="profile-top">

            <div className="profile-avatar-large">

              {employee.name?.charAt(0).toUpperCase()}

            </div>

            <div className="profile-info">

              <h2>{employee.name}</h2>

              <p>{employee.designation}</p>

              <span>{employee.department}</span>

            </div>

          </div>

          <div className="profile-divider"></div>

          <div className="profile-stats-mini">

            <div className="mini-box">

              <span>Total Tasks</span>

              <h3>{totalTasks}</h3>

            </div>

            <div className="mini-box">

              <span>Completed</span>

              <h3>{completedTasks}</h3>

            </div>

            <div className="mini-box">

              <span>Pending</span>

              <h3>{pendingTasks}</h3>

            </div>

          </div>

        </div>

        {/* Right Performance Card */}

        <div className="performance-banner">

          <div className="performance-left">

            <div className="performance-icon">

              <FaChartLine />

            </div>

            <div>

              <h4>Performance Score</h4>

              <p>Based on completed tasks</p>

            </div>

          </div>

          <div className="performance-right">

            <h1>{completionRate}%</h1>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* Statistics Cards */}
      {/* ========================= */}

      <div className="stats-grid">

        <div className="stats-card blue">

          <div className="stats-icon">📋</div>

          <div>

            <h4>Total Tasks</h4>

            <h2>{totalTasks}</h2>

          </div>

        </div>

        <div className="stats-card green">

          <div className="stats-icon">✅</div>

          <div>

            <h4>Completed</h4>

            <h2>{completedTasks}</h2>

          </div>

        </div>

        <div className="stats-card orange">

          <div className="stats-icon">⏳</div>

          <div>

            <h4>Pending</h4>

            <h2>{pendingTasks}</h2>

          </div>

        </div>

        <div className="stats-card red">

          <div className="stats-icon">🔥</div>

          <div>

            <h4>High Priority</h4>

            <h2>
              {employee.tasks?.filter(
                (task) => task.priority === "High"
              ).length || 0}
            </h2>

          </div>

        </div>

        <div className="stats-card purple">

          <div className="stats-icon">⭐</div>

          <div>

            <h4>Medium Priority</h4>

            <h2>
              {employee.tasks?.filter(
                (task) => task.priority === "Medium"
              ).length || 0}
            </h2>

          </div>

        </div>

        <div className="stats-card cyan">

          <div className="stats-icon">💡</div>

          <div>

            <h4>Low Priority</h4>

            <h2>
              {employee.tasks?.filter(
                (task) => task.priority === "Low"
              ).length || 0}
            </h2>

          </div>

        </div>

      </div>
            {/* ========================= */}
      {/* Charts Section */}
      {/* ========================= */}

      <div className="charts-grid">

        {/* ========================= */}
        {/* Overall Progress */}
        {/* ========================= */}

        <div className="progress-card">

          <div className="progress-header">

            <h3>Overall Progress</h3>

            <span>{completionRate}%</span>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${completionRate}%`,
              }}
            ></div>

          </div>

          <div className="progress-footer">

            <span>
              Completed
              <strong> {completedTasks}</strong>
            </span>

            <span>
              Total
              <strong> {totalTasks}</strong>
            </span>

          </div>

        </div>

        {/* ========================= */}
        {/* Pie Chart */}
        {/* ========================= */}

        <div className="chart-card">

          <div className="chart-header">

            <h3>Task Status</h3>

          </div>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={90}
                innerRadius={55}
                paddingAngle={4}
                label
              >

                {pieData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

          <div className="chart-legend">

            <div>

              <span className="legend completed"></span>

              Completed

            </div>

            <div>

              <span className="legend pending"></span>

              Pending

            </div>

          </div>

        </div>

        {/* ========================= */}
        {/* Priority Distribution */}
        {/* ========================= */}

        <div className="chart-card">

          <div className="chart-header">

            <h3>Priority Distribution</h3>

          </div>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={priorityData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="priority" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="tasks"
                fill="#4f46e5"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ========================= */}
      {/* Performance Summary */}
      {/* ========================= */}

      <div className="performance-summary">

        <div className="summary-box">

          <h4>Completed Tasks</h4>

          <h2>{completedTasks}</h2>

        </div>

        <div className="summary-box">

          <h4>Pending Tasks</h4>

          <h2>{pendingTasks}</h2>

        </div>

        <div className="summary-box">

          <h4>Completion Rate</h4>

          <h2>{completionRate}%</h2>

        </div>

      </div>
            {/* ========================= */}
      {/* Recent Tasks */}
      {/* ========================= */}

      <div className="recent-task-card">

        <div className="section-header">

          <h2>Recent Tasks</h2>

          <button className="export-btn">

            <FaDownload />

            <span>Export</span>

          </button>

        </div>

        <table className="task-table">

          <thead>

            <tr>

              <th>Date</th>

              <th>Task</th>

              <th>Priority</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {employee.tasks?.length > 0 ? (

              employee.tasks.map((task, index) => (

                <tr key={task._id || task.id || index}>

                  <td>{task.date}</td>

                  <td>{task.task}</td>

                  <td>

                    <span
                      className={`priority-badge ${
                        (task.priority || "Low").toLowerCase()
                      }`}
                    >
                      {task.priority || "Low"}
                    </span>

                  </td>

                  <td>

                    <span
                      className={`status-badge ${
                        task.remarks === "Closed"
                          ? "closed"
                          : task.remarks === "In-Process"
                          ? "progress"
                          : "pending"
                      }`}
                    >
                      {task.remarks}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="no-task"
                >

                  No Tasks Found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
            {/* ========================= */}
      {/* Recent Activity Timeline */}
      {/* ========================= */}

      <div className="timeline-card">

        <h2>Recent Activity</h2>

        <div className="timeline">

          {(employee.tasks || [])
            .slice()
            .reverse()
            .slice(0, 5)
            .map((task, index) => (

              <div
                className="timeline-item"
                key={task._id || task.id || index}
              >

                <div className="timeline-dot"></div>

                <div className="timeline-content">

                  <h4>{task.task}</h4>

                  <p>
                    {task.date}
                    {task.timing && ` • ${task.timing}`}
                  </p>

                  <span
                    className={`status-badge ${
                      task.remarks === "Closed"
                        ? "closed"
                        : task.remarks === "In-Process"
                        ? "progress"
                        : "pending"
                    }`}
                  >
                    {task.remarks}
                  </span>

                </div>

              </div>

            ))}

        </div>

      </div>

      {/* ========================= */}
      {/* Employee Information */}
      {/* ========================= */}

      <div className="employee-details-card">

        <h2>Employee Information</h2>

        <div className="employee-details-grid">

          <div className="detail-box">
            <span>Full Name</span>
            <h4>{employee.name}</h4>
          </div>

          <div className="detail-box">
            <span>Email</span>
            <h4>{employee.email || "N/A"}</h4>
          </div>

          <div className="detail-box">
            <span>Phone</span>
            <h4>{employee.phone || "N/A"}</h4>
          </div>

          <div className="detail-box">
            <span>Designation</span>
            <h4>{employee.designation || "N/A"}</h4>
          </div>

          <div className="detail-box">
            <span>Department</span>
            <h4>{employee.department || "N/A"}</h4>
          </div>

          <div className="detail-box">
            <span>Status</span>

            <h4
              className={
                employee.status === "Active"
                  ? "status-active"
                  : "status-inactive"
              }
            >
              {employee.status || "Active"}
            </h4>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* Performance Summary */}
      {/* ========================= */}

      <div className="summary-card">

        <h2>Performance Summary</h2>

        <div className="summary-grid">

          <div className="summary-box">

            <span>Total Tasks</span>

            <h2>{totalTasks}</h2>

          </div>

          <div className="summary-box">

            <span>Completed</span>

            <h2>{completedTasks}</h2>

          </div>

          <div className="summary-box">

            <span>Pending</span>

            <h2>{pendingTasks}</h2>

          </div>

          <div className="summary-box">

            <span>Completion Rate</span>

            <h2>{completionRate}%</h2>

          </div>

        </div>

      </div>
          </div>

  );

}

export default Profile;