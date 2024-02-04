const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../db/db.json");


function readData() {
  const data = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(data);
}


function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
}

router.get("/notes", (req, res) => {
    const notes = readData();
    res.json(notes);
  });
  
 
  router.get("/notes/:id", (req, res) => {
    const noteId = parseInt(req.params.id);
    const notes = readData();
    const note = notes.find((n) => n.id === noteId);
  
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  });

  router.post("/notes", (req, res) => {
    const { title, text } = req.body;
    const notes = readData();
    const newNote = {
      id: Date.now(),
      title,
      text,
    };
  
    notes.push(newNote);
    writeData(notes);
    res.status(201).json(newNote);
  });

  router.put("/notes/:id", (req, res) => {
    const noteId = parseInt(req.params.id);
    const { title, text } = req.body;
    let notes = readData();
    const noteIndex = notes.findIndex((n) => n.id === noteId);
  
    if (noteIndex !== -1) {
      notes[noteIndex].title = title || notes[noteIndex].title;
      notes[noteIndex].text = text || notes[noteIndex].text;
      writeData(notes);
      res.json(notes[noteIndex]);
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  });

  router.delete("/notes/:id", (req, res) => {
    const noteId = parseInt(req.params.id);
    let notes = readData();
    const noteIndex = notes.findIndex((n) => n.id === noteId);
  
    if (noteIndex !== -1) {
      const deletedNote = notes.splice(noteIndex, 1);
      writeData(notes);
      res.json(deletedNote[0]);
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  });
  
  module.exports = router;