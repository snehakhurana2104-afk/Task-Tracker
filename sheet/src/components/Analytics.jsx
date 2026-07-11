import React from "react";
import "../assets/css/analytics.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import logo from "../assets/ssdn-logo.png";

const Analytics = ({ tasks = [], darkMode }) => {

  // ===============================
  // Dashboard Summary
  // ===============================

  const totalTasks = tasks.length;

  const closedTasks = tasks.filter(
    (task) =>
      task.remarks &&
      task.remarks.toLowerCase().includes("closed")
  ).length;

  const pendingTasks = tasks.filter(
    (task) =>
      task.remarks &&
      task.remarks.toLowerCase().includes("pending")
  ).length;

  const inProcessTasks = tasks.filter(
    (task) =>
      task.remarks &&
      task.remarks.toLowerCase().includes("in-process")
  ).length;

  const callTasks = tasks.filter(
    (task) =>
      task.remarks &&
      task.remarks.toLowerCase().includes("call")
  ).length;

  const replyTasks = tasks.filter(
    (task) =>
      task.remarks &&
      (
        task.remarks.toLowerCase().includes("reply") ||
        task.remarks.toLowerCase().includes("respond") ||
        task.remarks.toLowerCase().includes("solution")
      )
  ).length;

  // ===============================
  // Status Pie Data
  // ===============================

  const statusData = [
    { name: "Pending", value: pendingTasks },
    { name: "In Process", value: inProcessTasks },
    { name: "Closed", value: closedTasks },
    { name: "Calls", value: callTasks },
    { name: "Reply", value: replyTasks },
  ];

  // ===============================
  // Employee Performance Data
  // ===============================

  const employeeMap = {};

  tasks.forEach((task) => {
    const name = task.name || "Unknown";
    employeeMap[name] = (employeeMap[name] || 0) + 1;
  });

  const employeeData = Object.keys(employeeMap).map((key) => ({
    name: key,
    tasks: employeeMap[key],
  }));

  // ===============================
  // Date Wise Data
  // ===============================

  const dateMap = {};

  tasks.forEach((task) => {
    const date = task.date || "Unknown";
    dateMap[date] = (dateMap[date] || 0) + 1;
  });

  const dateData = Object.keys(dateMap).map((key) => ({
    date: key,
    tasks: dateMap[key],
  }));
    // ===============================
  // Monthly Data
  // ===============================

  const monthMap = {};

  tasks.forEach((task) => {
    if (!task.date) return;

    const parts = task.date.split("-");

    if (parts.length === 3) {
      const month = `${parts[1]}-${parts[2]}`;
      monthMap[month] = (monthMap[month] || 0) + 1;
    }
  });

  const monthlyData = Object.keys(monthMap).map((month) => ({
    month,
    tasks: monthMap[month],
  }));

  // ===============================
  // Priority Wise Data
  // ===============================

  const priorityMap = {};

  tasks.forEach((task) => {
    const priority = task.priority || "Not Set";
    priorityMap[priority] = (priorityMap[priority] || 0) + 1;
  });

  const priorityData = Object.keys(priorityMap).map((key) => ({
    priority: key,
    tasks: priorityMap[key],
  }));

  // ===============================
  // Employee Closed vs Pending
  // ===============================

  const employeeStatusMap = {};

  tasks.forEach((task) => {
    const emp = task.name || "Unknown";

    if (!employeeStatusMap[emp]) {
      employeeStatusMap[emp] = {
        name: emp,
        closed: 0,
        pending: 0,
      };
    }

    const remark = (task.remarks || "").toLowerCase();

    if (remark.includes("closed")) {
      employeeStatusMap[emp].closed++;
    } else {
      employeeStatusMap[emp].pending++;
    }
  });

  const employeeStatusData = Object.values(employeeStatusMap);

  // ===============================
  // Chart Colors
  // ===============================

  const COLORS = [
    "#ff9800",
    "#03a9f4",
    "#4caf50",
    "#9c27b0",
    "#f44336",
  ];

  return (
    <div className={`analytics-page ${darkMode ? "dark" : ""}`}>

      <div className="analytics-header">

        <h1 className="analytics-title">
          Analytics Dashboard
        </h1>

        <img
          src={logo}
          alt="SSDN"
          className="analytics-logo"
        />

      </div>

      {/* Summary Cards */}

      <div className="summary-cards">

        <div className="card">
          <h4>Total Tasks</h4>
          <h2>{totalTasks}</h2>
        </div>

        <div className="card">
          <h4>Pending</h4>
          <h2>{pendingTasks}</h2>
        </div>

        <div className="card">
          <h4>In Process</h4>
          <h2>{inProcessTasks}</h2>
        </div>

        <div className="card">
          <h4>Closed</h4>
          <h2>{closedTasks}</h2>
        </div>

        <div className="card">
          <h4>Calls</h4>
          <h2>{callTasks}</h2>
        </div>

        <div className="card">
          <h4>Reply / Solution</h4>
          <h2>{replyTasks}</h2>
        </div>

      </div>
            {/* ===============================
          Charts Row 1
      =============================== */}

      <div className="charts-row">

        {/* Status Wise Pie Chart */}

        <div className="chart-box">

          <h3>Status Wise Tasks</h3>

          <ResponsiveContainer width="100%" height={350}>

            <PieChart>

              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >

                {statusData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Employee Performance */}

        <div className="chart-box">

          <h3>Employee Performance</h3>

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={employeeData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                angle={-20}
                textAnchor="end"
                interval={0}
              />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="tasks"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ===============================
          Charts Row 2
      =============================== */}

      <div className="charts-row">

        {/* Date Wise Tasks */}

        <div className="chart-box">

          <h3>Date Wise Tasks</h3>

          <ResponsiveContainer width="100%" height={320}>

            <BarChart data={dateData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="tasks"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Monthly Tasks */}

        <div className="chart-box">

          <h3>Monthly Tasks</h3>

          <ResponsiveContainer width="100%" height={320}>

            <BarChart data={monthlyData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="tasks"
                fill="#f59e0b"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ===============================
          Charts Row 3
      =============================== */}

      <div className="charts-row">

        {/* Priority Wise Tasks */}

        <div className="chart-box">

          <h3>Priority Wise Tasks</h3>

          <ResponsiveContainer width="100%" height={320}>

            <BarChart data={priorityData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="priority" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="tasks"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>
            {/* ===============================
          Charts Row 4
      =============================== */}

      <div className="charts-row">

        {/* Employee Closed vs Pending */}

        <div className="chart-box">

          <h3>Employee Closed vs Pending</h3>

          <ResponsiveContainer width="100%" height={320}>

            <BarChart data={employeeStatusData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                angle={-20}
                textAnchor="end"
                interval={0}
              />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="closed"
                fill="#22c55e"
                name="Closed"
              />

              <Bar
                dataKey="pending"
                fill="#ef4444"
                name="Pending"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Employee Task Summary */}

        <div className="chart-box">

          <h3>Employee Task Summary</h3>

          <table className="analytics-table">

            <thead>
              <tr>
                <th>Employee</th>
                <th>Total Tasks</th>
              </tr>
            </thead>

            <tbody>

              {employeeData.map((emp, index) => (

                <tr key={index}>
                  <td>{emp.name}</td>
                  <td>{emp.tasks}</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ===============================
          Recent Activity
      =============================== */}

      <div className="recent-activity">

        <h3>Recent Activities</h3>

        <table className="analytics-table">

          <thead>

            <tr>
              <th>Date</th>
              <th>Employee</th>
              <th>Task</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {[...tasks]
              .sort(
                (a, b) =>
                  new Date(b.createdAt) -
                  new Date(a.createdAt)
              )
              .slice(0, 8)
              .map((task, index) => (

                <tr key={task._id || index}>

                  <td>{task.date}</td>
                  <td>{task.name}</td>
                  <td>{task.task}</td>
                  <td>{task.remarks}</td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Analytics;