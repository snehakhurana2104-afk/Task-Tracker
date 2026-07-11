import React, { useState } from "react";

import {
  Moon,
  Sun,
  Bell,
  Mail,
  RefreshCw,
  Palette,
  User,
  Save,
} from "lucide-react";

import "../assets/css/settings.css";

const Settings = ({ darkMode, setDarkMode }) => {

  // ==========================
  // STATES
  // ==========================

  const [emailNotification, setEmailNotification] = useState(true);

  const [browserNotification, setBrowserNotification] = useState(true);

  const [autoRefresh, setAutoRefresh] = useState("10");

  const [exportFormat, setExportFormat] = useState("Excel");

  const [themeColor, setThemeColor] = useState("Blue");

  // ==========================
  // SAVE SETTINGS
  // ==========================

  const saveSettings = () => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

    localStorage.setItem(
      "themeColor",
      themeColor
    );

    localStorage.setItem(
      "emailNotification",
      JSON.stringify(emailNotification)
    );

    localStorage.setItem(
      "browserNotification",
      JSON.stringify(browserNotification)
    );

    localStorage.setItem(
      "autoRefresh",
      autoRefresh
    );

    localStorage.setItem(
      "exportFormat",
      exportFormat
    );

    alert("Settings Saved Successfully");

  };

  return (

    <div className={darkMode ? "settings dark" : "settings"}>

      {/* ==========================
          HEADER
      ========================== */}

      <div className="settings-header">

        <h1>
          Settings
        </h1>

        <p>
          Customize your Task Tracker Dashboard
        </p>

      </div>

      {/* ==========================
          APPEARANCE CARD
      ========================== */}

      <div className="settings-card">

        <div className="setting-title">

          <Palette size={22} />

          <h3>
            Appearance
          </h3>

        </div>
                {/* ==========================
            DARK MODE
        ========================== */}

        <div className="setting-row">

          <span>
            Dark Mode
          </span>

          <button
            className={`toggle-btn ${darkMode ? "active" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
          >

            {
              darkMode ?

              <>

                <Moon size={18} />

                Dark Mode

              </>

              :

              <>

                <Sun size={18} />

                Light Mode

              </>

            }

          </button>

        </div>

        {/* ==========================
            THEME COLOR
        ========================== */}

        <div className="setting-row">

          <span>
            Theme Color
          </span>

          <select
            value={themeColor}
            onChange={(e) =>
              setThemeColor(e.target.value)
            }
          >

            <option>
              Blue
            </option>

            <option>
              Purple
            </option>

            <option>
              Green
            </option>

            <option>
              Orange
            </option>

          </select>

        </div>

      </div>

      {/* ==========================
          NOTIFICATION CARD
      ========================== */}

      <div className="settings-card">

        <div className="setting-title">

          <Bell size={22} />

          <h3>
            Notifications
          </h3>

        </div>

        <div className="setting-row">

          <span>
            Email Notifications
          </span>

          <input
            type="checkbox"
            checked={emailNotification}
            onChange={() =>
              setEmailNotification(
                !emailNotification
              )
            }
          />

        </div>

        <div className="setting-row">

          <span>
            Browser Notifications
          </span>

          <input
            type="checkbox"
            checked={browserNotification}
            onChange={() =>
              setBrowserNotification(
                !browserNotification
              )
            }
          />

        </div>

      </div>

      {/* ==========================
          SYSTEM CARD
      ========================== */}

      <div className="settings-card">

        <div className="setting-title">

          <RefreshCw size={22} />

          <h3>
            System
          </h3>

        </div>
                <div className="setting-row">

          <span>
            Auto Refresh
          </span>

          <select
            value={autoRefresh}
            onChange={(e) =>
              setAutoRefresh(e.target.value)
            }
          >

            <option value="5">
              5 Seconds
            </option>

            <option value="10">
              10 Seconds
            </option>

            <option value="30">
              30 Seconds
            </option>

            <option value="0">
              Off
            </option>

          </select>

        </div>

        <div className="setting-row">

          <span>
            Export Format
          </span>

          <select
            value={exportFormat}
            onChange={(e) =>
              setExportFormat(e.target.value)
            }
          >

            <option>
              Excel
            </option>

            <option>
              CSV
            </option>

            <option>
              PDF
            </option>

          </select>

        </div>

      </div>

      {/* ==========================
          ACCOUNT CARD
      ========================== */}

      <div className="settings-card">

        <div className="setting-title">

          <User size={22} />

          <h3>
            Account
          </h3>

        </div>

        <div className="setting-row">

          <span>
            Profile
          </span>

          <button className="profile-btn">

            <User size={18} />

            View Profile

          </button>

        </div>

        <div className="setting-row">

          <span>
            Contact
          </span>

          <div className="mail-box">

            <Mail size={18} />

            admin@ssdntech.com

          </div>

        </div>

      </div>

      {/* ==========================
          SAVE BUTTON
      ========================== */}

      <div className="save-section">

        <button
          className="save-btn"
          onClick={saveSettings}
        >

          <Save size={18} />

          Save Settings

        </button>

      </div>

    </div>

  );

};

export default Settings;