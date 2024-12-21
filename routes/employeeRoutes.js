const express = require('express');
const { addEmployeeFromCandidate,getAllEmployees, getEmployeeById ,deleteEmployee , updateEmployee } = require('../controllers/employeeController');
const router = express.Router();


router.put('/:id', addEmployeeFromCandidate);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.get('/:id', deleteEmployee)
router.get('/:id', updateEmployee)
module.exports = router;
