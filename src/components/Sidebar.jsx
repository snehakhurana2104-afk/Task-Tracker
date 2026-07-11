import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutGrid,
  ClipboardList,
  Users,
  BarChart3,
  User,
  Settings,
  LogOut,
 
} from "lucide-react";

import "../assets/css/sidebar.css";
import logo from "../assets/ssdn-logo.png";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="logo-section">

        <img
          src={logo}
          alt="SSDN Logo"
          className="sidebar-logo"
        />

        <h2 className="sidebar-title">
          Task Tracker
        </h2>

        <p className="sidebar-subtitle">
          Corporate Dashboard
        </p>

      </div>

      {/* Menu */}

      <div className="sidebar-menu">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <LayoutGrid size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/operation"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <ClipboardList size={20} />
          <span>Operations</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <BarChart3 size={20} />
          <span>Analytics</span>
        </NavLink>

        <NavLink
          to="/team"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <Users size={20} />
          <span>Team</span>
        </NavLink>

       

        <NavLink
          to="/profile/Srishti"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <User size={20} />
          <span>Profile</span>
        </NavLink>

      </div>

      {/* Footer */}

      <div className="sidebar-footer">

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

        <div className="nav-item logout">
          <LogOut size={20} />
          <span>Logout</span>
        </div>

      </div>

    </aside>
  );
};

export default Sidebar;