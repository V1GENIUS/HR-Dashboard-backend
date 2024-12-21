const express = require("express");
const { addCandidate, getCandidates,updateCandidateStatus , updateJobStatusAndAddToEmployees } = require("../controllers/candidateController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post('/add', upload.single('resume'), (req, res) => {
    if (req.fileValidationError) {
      return res.status(400).send({ message: req.fileValidationError });
    }
    if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file' });
    }})


// router.post('/',addCandidate)

router.get("/", getCandidates);

router.put('/:id', updateCandidateStatus);

router.put('/:id/job-status', updateJobStatusAndAddToEmployees);

router.post('/test', async (req, res) => {
  res.status(200).json({ message: "Test endpoint working" });
});


module.exports = router;
