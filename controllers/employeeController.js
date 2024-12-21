const Candidate = require('../models/Candidate');
const Employee = require('../models/Employee');


const addEmployeeFromCandidate = async (req, res) => {
  const { id } = req.params;

  try {
    
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

  
    if (candidate.job_status !== "Full Time") {
      return res.status(400).json({ message: 'Candidate is not Full Time' });
    }

   
    const newEmployee = new Employee({
      fullName: candidate.fullName,
      email: candidate.email,
      phone: candidate.phone,
      position: candidate.position,
      department: candidate.department,
      profileImg: candidate.profileImg,
      job_status: candidate.job_status,
      date_of_joining: candidate.date_of_joining
    });

  
    await newEmployee.save();

  
    res.status(201).json(newEmployee);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all employees
const getAllEmployees = async (req, res) => {
    try {
      const employees = await Employee.find(); 
      res.status(200).json(employees); 
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
    const getEmployeeById = async (req, res) => {
    const { id } = req.params; 
    try {
      const employee = await Employee.findById(id); 
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(employee); 
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Update a employee
const updateEmployee = async (req, res) => {
  try {
    const employee = await employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).json({ success: false, message: "employee not found" });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "employee not found" });
    }
    res.status(200).json({ success: true, message: "employee deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
  

module.exports = { addEmployeeFromCandidate, getAllEmployees,
    getEmployeeById,deleteEmployee ,updateEmployee };
