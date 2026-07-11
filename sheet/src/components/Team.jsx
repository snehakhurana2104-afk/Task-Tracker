import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/team.css";

import {
  Plus,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Briefcase,
  X,
  AlertCircle,
  User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Team = ({ tasks = [] }) => {

  const navigate = useNavigate();

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    status: "Active",
  };

  const [formData, setFormData] =
    useState(initialFormState);

  // ==========================
  // Fetch Team Members
  // ==========================

  const fetchTeam = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/team"
      );

      if (response.data.success) {
        setTeamMembers(response.data.data);
      }

      setLoading(false);

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Failed to fetch team members."
      );

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // ==========================
  // Form Change
  // ==========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ==========================
  // Open Add Modal
  // ==========================

  const openAddModal = () => {

    setEditId(null);
    setFormData(initialFormState);
    setError("");
    setIsModalOpen(true);

  };

  // ==========================
  // Open Edit Modal
  // ==========================

  const openEditModal = (member) => {

    setEditId(member._id);

    setFormData({

      name: member.name,
      email: member.email,
      phone: member.phone,
      designation: member.designation,
      department: member.department,
      status: member.status,

    });

    setError("");
    setIsModalOpen(true);

  };

  // ==========================
  // Save Member
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await axios.put(
          `http://localhost:5000/api/team/${editId}`,
          formData
        );

      } else {

        await axios.post(
          "http://localhost:5000/api/team",
          formData
        );

      }

      setIsModalOpen(false);
      fetchTeam();

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Something went wrong."
      );

    }

  };

  // ==========================
  // Delete Member
  // ==========================

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this member?"
      )
    )
      return;

    try {

      await axios.delete(
        `http://localhost:5000/api/team/${id}`
      );

      fetchTeam();

    } catch (err) {

      alert(
        err.response?.data?.message ||
          "Delete failed."
      );

    }

  };

  // ==========================
  // Open Employee Profile
  // ==========================

  const openProfile = (member) => {

    navigate(
      `/profile/${encodeURIComponent(member.name)}`
    );

  };

  return (

    <div className="team-container">

      <div className="team-header">

        <div>

          <h1>
            Team Management
          </h1>

          <p>
            Manage employees and view
            their profiles.
          </p>

        </div>

        <button
          className="add-btn"
          onClick={openAddModal}
        >

          <Plus size={18} />

          Add Team Member

        </button>

      </div>
            {error && !isModalOpen && (

        <div className="error-box">

          <AlertCircle size={18} />

          <span>{error}</span>

        </div>

      )}

      {loading ? (

        <div className="loading-box">

          <div className="loader"></div>

        </div>

      ) : (

        <div className="team-table-wrapper">

          <table className="team-table">

            <thead>

              <tr>

                <th>Member</th>

                <th>Department</th>

                <th>Contact</th>

                <th>Status</th>

                <th>Tasks</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {teamMembers.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="empty-row"
                  >

                    No Team Members Found

                  </td>

                </tr>

              ) : (

                teamMembers.map((member) => {

                  const memberTasks = tasks.filter(
                    (task) =>
                      task.name?.trim().toLowerCase() ===
                      member.name?.trim().toLowerCase()
                  );

                  return (

                    <tr key={member._id}>

                      {/* Member */}

                      <td>

                        <div className="member-info">

                          <div className="member-avatar">

                            {member.name
                              ?.charAt(0)
                              .toUpperCase()}

                          </div>

                          <div>

                            <h4>{member.name}</h4>

                            <span>
                              {member.designation}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* Department */}

                      <td>

                        <div className="department-box">

                          <Briefcase size={15} />

                          {member.department}

                        </div>

                      </td>

                      {/* Contact */}

                      <td>

                        <div className="contact-box">

                          <div>

                            <Mail size={14} />

                            {member.email}

                          </div>

                          <div>

                            <Phone size={14} />

                            {member.phone}

                          </div>

                        </div>

                      </td>

                      {/* Status */}

                      <td>

                        <span
                          className={`status ${
                            member.status === "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          {member.status}
                        </span>

                      </td>

                      {/* Total Tasks */}

                      <td>

                        <span className="task-count">

                          {memberTasks.length}

                        </span>

                      </td>

                      {/* Actions */}

                      <td>

                        <div className="action-buttons">

                          {/* View Profile */}

                          <button
                            className="view-btn"
                            title="View Profile"
                            onClick={() =>
                              openProfile(member)
                            }
                          >

                            <User size={17} />

                          </button>

                          {/* Edit */}

                          <button
                            className="edit-btn"
                            title="Edit"
                            onClick={() =>
                              openEditModal(member)
                            }
                          >

                            <Edit2 size={17} />

                          </button>

                          {/* Delete */}

                          <button
                            className="delete-btn"
                            title="Delete"
                            onClick={() =>
                              handleDelete(member._id)
                            }
                          >

                            <Trash2 size={17} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  );

                })

              )}

            </tbody>

          </table>

        </div>

      )}
            {/* ========================= */}
      {/* Add / Edit Team Member Modal */}
      {/* ========================= */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <div className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">

            {/* Modal Header */}

            <div className="flex items-center justify-between px-6 py-4 border-b">

              <h2 className="text-lg font-semibold text-slate-800">
                {editId ? "Edit Team Member" : "Add Team Member"}
              </h2>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setError("");
                }}
                className="text-slate-500 hover:text-red-500"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* Name */}

              <div>

                <label className="block mb-2 text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>

              {/* Email */}

              <div>

                <label className="block mb-2 text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>

              {/* Phone */}

              <div>

                <label className="block mb-2 text-sm font-medium">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>

              {/* Designation */}

              <div>

                <label className="block mb-2 text-sm font-medium">
                  Designation
                </label>

                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>

              {/* Department */}

              <div>

                <label className="block mb-2 text-sm font-medium">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>

              {/* Status */}

              <div>

                <label className="block mb-2 text-sm font-medium">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 pt-4 border-t">

                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setError("");
                    setFormData(initialFormState);
                    setEditId(null);
                  }}
                  className="px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
                >
                  {editId ? "Update Member" : "Add Member"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default Team;