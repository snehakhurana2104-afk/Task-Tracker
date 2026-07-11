import express from "express";

import {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/teamController.js";

// ===========================================
// Initialize Router
// ===========================================

const router = express.Router();

// ===========================================
// Team Routes
// ===========================================

// Get All Team Members
// GET : /api/team
router.get("/", getAllMembers);

// Get Single Team Member
// GET : /api/team/:id
router.get("/:id", getMemberById);

// Add New Team Member
// POST : /api/team
router.post("/", createMember);

// Update Team Member
// PUT : /api/team/:id
router.put("/:id", updateMember);

// Delete Team Member
// DELETE : /api/team/:id
router.delete("/:id", deleteMember);

// ===========================================
// Export Router
// ===========================================

export default router;