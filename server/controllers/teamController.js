import Team from "../models/Team.js";

// ===========================================
// Get All Team Members
// GET : /api/team
// ===========================================

export const getAllMembers = async (req, res) => {
  try {
    const members = await Team.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch team members.",
      error: error.message,
    });
  }
};

// ===========================================
// Get Single Team Member
// GET : /api/team/:id
// ===========================================

export const getMemberById = async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch team member.",
      error: error.message,
    });
  }
};

// ===========================================
// Add New Team Member
// POST : /api/team
// ===========================================

export const createMember = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      designation,
      department,
      status,
    } = req.body;

    // Check duplicate email
    const existingMember = await Team.findOne({ email });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const newMember = await Team.create({
      name,
      email,
      phone,
      designation,
      department,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Team member added successfully.",
      data: newMember,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add team member.",
      error: error.message,
    });
  }
};

// ===========================================
// Update Team Member
// PUT : /api/team/:id
// ===========================================

export const updateMember = async (req, res) => {
  try {
    const updatedMember = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member updated successfully.",
      data: updatedMember,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update member.",
      error: error.message,
    });
  }
};

// ===========================================
// Delete Team Member
// DELETE : /api/team/:id
// ===========================================

export const deleteMember = async (req, res) => {
  try {
    const deletedMember = await Team.findByIdAndDelete(req.params.id);

    if (!deletedMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete member.",
      error: error.message,
    });
  }
};