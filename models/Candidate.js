const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  experience: { type: String, required: true },
  status: {
    type: String,
    enum: ['New', 'Scheduled', 'Selected', 'Rejected'],
    default: 'New',
  },
  resume: { type: String, required: true }, 
}, 
{ timestamps: true });

module.exports = mongoose.model("Candidate", CandidateSchema);
