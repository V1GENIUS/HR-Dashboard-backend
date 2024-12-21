const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Leave Routes Working!');
});

module.exports = router;
