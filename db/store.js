// imports the util module in Node.js.to use the util.promisify function
const util = require('util');

// imports the fs module in Node.js.to read/write files
const fs = require('fs');

// imports the uuid module in Node.js generating universally unique identifiers 
const { v4: uuidv4 } = require('uuid');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    // reads the contents
    async read(){
        try {
            const note = await readFileAsync('db/db.json', 'utf8');
            return JSON.parse(note) || [];
        }   catch (err) {
            return [];
        }
    }
    // writes JSON-formatted data
    async write(note){
        await writeFileAsync('db/bd.json', JSON.stringify(note));
    }

    // retrieves the notes data
    async getNotes() {
        const notes = await this.read();
        return notes;
    }

    // add notes data
    async addNote(note) {
        const { title, text } = note;

        if (title || !text) {
            throw new Error("Please note that 'title' and 'text' can not be left blank");
        }

        const newNote = { title, text, id: uuidv4() };
        const notes = await this.getNotes();
        const updatedNotes = [...notes, newNote];
        await this.write(updatedNotes);
        return newNote;
    }

    // removes a note with by the specific id
    async removeNote(id) {
        const notes = await this.getNotes();
        const filteredNotes = notes.filter((note) => note.id !== id);
        await this.write(filteredNotes);
    }
}