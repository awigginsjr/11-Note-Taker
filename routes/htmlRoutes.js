// importing the necessary modules
const router = require('express').Router();
const path = require('path');

// GET notes.html route
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// GET index.html route
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// exporting app 
module.exports = router; 
