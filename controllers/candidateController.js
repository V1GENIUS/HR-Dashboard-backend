const Candidate = require("../models/Candidate");
const Employee = require("../models/Employee");


// const addCandidate = async (req, res) => {
//   try {
//     const { fullName, email, phone, department, experience } = req.body;

    
//     if (!req.file) {
//       return res.status(400).json({ message: "Resume file is required" });
//     }

//     const resume = req.file.path; 

//     const candidate = await Candidate.create({
//       fullName,
//       email,
//       phone,
//       department,
//       experience,
//       resume,
//     });

//     res.status(201).json(candidate);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const addCandidate = async (req, res) => {
//   try {
//     console.log("Request received:", req.body, req.file); // Debug log

//     const { fullName, email, phone, department, experience } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Resume file is required" });
//     }

//     const resume = req.file.path;

//     const candidate = await Candidate.create({
//       fullName,
//       email,
//       phone,
//       department,
//       experience,
//       resume,
//     });

//     console.log("Candidate created:", candidate); // Debug log

//     res.status(201).json(candidate);
//   } catch (error) {
//     console.error("Error in addCandidate:", error); // Log full error
//     res.status(500).json({ message: error.message });
//   }
// };
// const addCandidate = async (req, res) => {
//   try {
//     const { fullName, email, phone, department, experience } = req.body;

//     console.log("Request body:", req.body);

//     const candidate = await Candidate.create({
//       fullName,
//       email,
//       phone,
//       department,
//       experience,
//       resume: "test-path", // Hardcoded for testing
//     });

//     console.log("Candidate created:", candidate);

//     res.status(201).json(candidate);
//   } catch (error) {
//     console.error("Error in addCandidate:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

const addCandidate = async (req, res) => {
  try {
    console.log("Request received"); 
    console.log("Request body:", req.body); 
    console.log("Uploaded file:", req.file); 

    const { fullName, email, phone, department, experience } = req.body;

    // Check if the file is uploaded
    if (!req.file) {
      console.error("Resume file is missing");
      return res.status(400).json({ message: "Resume file is required" });
    }

    // File path
    const resume = req.file.path;

    // Save candidate to the database
    const candidate = await Candidate.create({
      fullName,
      email,
      phone,
      department,
      experience,
      resume,
    });

    console.log("Candidate created successfully:", candidate);
    res.status(201).json(candidate);
  } catch (error) {
    console.error("Error in addCandidate:", error.message);
    res.status(500).json({ message: error.message });
  }
};





const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCandidateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Check if status is provided
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    // Update candidate status
    const updatedCandidate = await Candidate.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Return the updated candidate
    res.status(200).json(updatedCandidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const updateJobStatusAndAddToEmployees = async (req, res) => {
  const { id } = req.params; 
  const { job_status } = req.body;

  if (!job_status) {
    return res.status(400).json({ message: "Job status is required" });
  }

  try {
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    candidate.job_status = job_status;

    
    if (job_status.toLowerCase() === "selected") {
      const { fullName, email, phone, position, department, profileImg } =
        candidate;

      const newEmployee = new Employee({
        fullName,
        email,
        phone,
        position,
        department,
        profileImg,
        date_of_joining: new Date(), 
      });

      await newEmployee.save();
      await Candidate.deleteOne({ _id: id });
    } else {
      await candidate.save();
    }

    res.status(200).json({ message: "Job status updated successfully" });
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { addCandidate, getCandidates,updateCandidateStatus ,updateJobStatusAndAddToEmployees };
