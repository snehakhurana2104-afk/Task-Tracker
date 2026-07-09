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
  Layers,
  X,
  AlertCircle,
  User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Team = () => {
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

  const [formData, setFormData] = useState(initialFormState);

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
  // Form Handlers
  // ==========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openAddModal = () => {
    setEditId(null);
    setFormData(initialFormState);
    setError("");
    setIsModalOpen(true);
  };

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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;

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
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">

        <div>

          <h1 className="text-2xl font-bold text-slate-900">
            Team Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage employees and open their profile dashboard.
          </p>

        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Team Member
        </button>

      </div>

      {error && !isModalOpen && (
        <div className="mb-5 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (

        <div className="flex justify-center items-center h-64">

          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>

        </div>

      ) : (

        <div className="bg-white rounded-xl shadow border overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-100">

                  <th className="px-6 py-4 text-left">Member</th>

                  <th className="px-6 py-4 text-left">
                    Department
                  </th>

                  <th className="px-6 py-4 text-left">
                    Contact
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>                {teamMembers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-slate-500"
                    >
                      No Team Members Found
                    </td>
                  </tr>
                ) : (
                  teamMembers.map((member) => (
                    <tr
                      key={member._id}
                      className="hover:bg-slate-50 transition"
                    >
                      {/* Member */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">
                          {member.name}
                        </div>
                      </td>

                      {/* Department */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="flex items-center gap-2">
                            <Briefcase
                              size={15}
                              className="text-slate-400"
                            />
                            {member.designation}
                          </span>

                          <span className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <Layers
                              size={15}
                              className="text-slate-400"
                            />
                            {member.department}
                          </span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="flex items-center gap-2">
                            <Mail size={14} />
                            {member.email}
                          </span>

                          <span className="flex items-center gap-2">
                            <Phone size={14} />
                            {member.phone}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            member.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {member.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">

                          {/* View Profile */}
                          <button
                            onClick={() => openProfile(member)}
                            className="p-2 rounded-lg hover:bg-blue-100 text-blue-600"
                            title="View Profile"
                          >
                            <User size={17} />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => openEditModal(member)}
                            className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600"
                            title="Edit"
                          >
                            <Edit2 size={17} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(member._id)}
                            className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}      {/* ========================= */}
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
                onClick={() => setIsModalOpen(false)}
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

              </div>              {/* Status */}

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