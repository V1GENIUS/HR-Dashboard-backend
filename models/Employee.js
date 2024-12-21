
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  department: String,
  resume: String,
  date_of_joining: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", EmployeeSchema);

