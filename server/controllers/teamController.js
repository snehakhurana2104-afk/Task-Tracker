const Team = require('../models/Team');

// @desc    Get all team members
// @route   GET /api/team
exports.getTeamMembers = async (req, res) => {
    try {
        const members = await Team.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: members.length, data: members });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add new team member
// @route   POST /api/team
exports.addTeamMember = async (req, res) => {
    try {
        const existingMember = await Team.findOne({ email: req.body.email });
        if (existingMember) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        const member = await Team.create(req.body);
        res.status(201).json({ success: true, data: member });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update team member
// @route   PUT /api/team/:id
exports.updateTeamMember = async (req, res) => {
    try {
        const member = await Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!member) {
            return res.status(404).json({ success: false, message: 'Member not found' });
        }
        res.status(200).json({ success: true, data: member });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
exports.deleteTeamMember = async (req, res) => {
    try {
        const member = await Team.findByIdAndDelete(req.params.id);
        if (!member) {
            return res.status(404).json({ success: false, message: 'Member not found' });
        }
        res.status(200).json({ success: true, message: 'Member removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};