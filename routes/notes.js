// const router = require('express').Router();
const express = require('express');
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the feedback
notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
notes.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  console.log("reqq", req.body);
  const { title, text } = req.body;
  if (title && text) {
    const newNotes = {
      title, 
      text,
      notes_id: uuidv4(),
    };
    readAndAppend(newNotes, './db/db.json');
    res.json({
      status: 'success',
      body: newNotes,
    });
  } else {
    res.status(400).json('Error in posting notes');
  }
});

// DELETE Route for deleting a note by ID
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
console.log("noteId", noteId);

  // Read the existing notes from the file
  readFromFile('./db/db.json')
  .then((data) => JSON.parse(data))
  .then((notesArray) => {
    // Filter out the note with the matching ID
    const updatedNotes = notesArray.filter((note) => note.notes_id && note.notes_id !== noteId);

    // Write the filtered array back to the file
    writeToFile('./db/db.json', updatedNotes);

    res.json({
      status: 'success',
      message: `Note with ID ${noteId} has been deleted`,
    });
  })
  .catch((error) => res.status(500).json(`Error: ${error.message}`));
});

module.exports = notes;

