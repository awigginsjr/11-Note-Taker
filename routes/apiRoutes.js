const router = require('express').Router();
const store = require('../db/store');

// // middleware to handle errors
const handleResponse = (promise) => (req, res, next) => {
    promise(req, res, next)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
};

// GET "/api/notes" responds with all notes from the database
router.get('/notes', handleResponse(store.getNotes));

// POST "/api/notes" adds a new note to the database
router.post('/notes', handleResponse(store.addNote));

// DELETE "/api/notes/:id" deletes the note with the given id from the database
router.delete('/notes/:id', handleResponse((req) => store.removeNote(req.params.id)
.then(() => ({ ok: true }) ({}))));

// exporting app 
module.exports = router;