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