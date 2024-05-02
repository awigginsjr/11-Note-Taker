const router = require('express').Router();
const Store = require('../db/store');
const store = new Store();

// GET "/api/notes" responds with all notes from the database
router.get('/notes', async (req, res, next) => {
    try {
        let notes = await store.getNotes();
        res.send(notes);
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
});

// POST "/api/notes" adds a new note to the database
router.post('/notes', async (req, res, next) => {
    try {
        let notes = await store.addNote(req.body);
        res.status(201).send(notes); // 201 Created status for successful creation
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
});

// DELETE "/api/notes/:id" deletes the note with the given id from the database
router.delete('/notes/:id', async (req, res, next) => {
    try {
        await store.removeNote(req.params.id);
        res.send({ ok: true });
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
});

// exporting app 
module.exports = router;