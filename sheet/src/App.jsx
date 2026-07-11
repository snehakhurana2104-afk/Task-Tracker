import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Operation from "./components/Operation";
import Analytics from "./components/Analytics";
import Team from "./components/Team";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

// =======================================
// INITIAL TASKS
// =======================================

// ⚠️ Yaha se apna pura initialTasks array
// wahi paste karo jo abhi tumhare App.jsx me hai.

const initialTasks = [
  {
    date: "01-07-2026",
    name: "Srishti",
    task: "Re: Intellectt Inc ( AI & Generative AI Training )- SSDN Technologies",
    timing: "10:33 AM",
    remarks: "In-Process",
    completedTime: "",
    completedDate: "",
  },

  {
    date: "01-07-2026",
    name: "Amit",
    task: "Re: Exploring Collaboration Opportunities with Kaplan ME + MOM",
    timing: "11:17 AM",
    remarks: "Closed",
    completedTime: "4:30 PM",
    completedDate: "01-07-2026",
  },

  {
    date: "01-07-2026",
    name: "Srishti",
    task: "Re: Proposal : Questionnaire_RE: SSDN Technologies_Beyond Codes Discussion",
    timing: "11:56 AM",
    remarks: "In-Process",
    completedTime: "",
    completedDate: "",
  },

  // ============================
  // ⚠️ Yaha se niche tak
  // tumhare jitne bhi initialTasks hain
  // unhe EXACT waise hi paste kar do.
  // Is Part me koi task delete mat karna.
  // ============================
];
// =======================================
// APP COMPONENT
// =======================================

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [recentTasks, setRecentTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // =======================================
  // FETCH TASKS FROM DATABASE
  // =======================================

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      // MongoDB se array safely nikalo
      const dbTasks = Array.isArray(response.data.data)
        ? response.data.data
        : [];

      // Initial + MongoDB Tasks
      const allTasks = [...initialTasks, ...dbTasks];

      setTasks(allTasks);

      // Latest 5 Tasks
      setRecentTasks([...allTasks].slice(-5).reverse());
    } catch (err) {
      console.error("Fetch Error:", err);

      // Agar MongoDB fail ho jaye to initialTasks show honge
      setTasks(initialTasks);
      setRecentTasks([...initialTasks].slice(-5).reverse());
    }
  };

  // =======================================
  // LOAD DATA
  // =======================================

  useEffect(() => {
    fetchTasks();
  }, []);
    return (
    <Router>
      <div className={darkMode ? "app-container dark" : "app-container"}>

        {/* ================= Sidebar ================= */}

        <Sidebar darkMode={darkMode} />

        {/* ================= Main Content ================= */}

        <main className="main-content">

          <Routes>

            {/* Default Route */}

            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            {/* Dashboard */}

            <Route
              path="/dashboard"
              element={
                <Dashboard
                  tasks={tasks}
                  setTasks={setTasks}
                  recentTasks={recentTasks}
                  setRecentTasks={setRecentTasks}
                  fetchTasks={fetchTasks}
                  darkMode={darkMode}
                />
              }
            />

            {/* Operation */}

            <Route
              path="/operation"
              element={
                <Operation
                  tasks={tasks}
                  setTasks={setTasks}
                  fetchTasks={fetchTasks}
                  darkMode={darkMode}
                />
              }
            />

            {/* Analytics */}

            <Route
              path="/analytics"
              element={
                <Analytics
                  tasks={tasks}
                  darkMode={darkMode}
                />
              }
            />
                        {/* ================= TEAM ================= */}

            <Route
              path="/team"
              element={
                <Team
                  tasks={tasks}
                  darkMode={darkMode}
                />
              }
            />

            {/* ================= PROFILE ================= */}

            <Route
              path="/profile"
              element={
                <Profile
                  tasks={tasks}
                  darkMode={darkMode}
                />
              }
            />

            <Route
              path="/profile/:name"
              element={
                <Profile
                  tasks={tasks}
                  darkMode={darkMode}
                />
              }
            />

            {/* ================= SETTINGS ================= */}

            <Route
              path="/settings"
              element={
                <Settings
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              }
            />

          </Routes>

        </main>

      </div>
    </Router>
  );
}

export default App;