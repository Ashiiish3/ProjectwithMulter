const express = require('express');
const { createNote, GetAllNotes, noteDelete, noteEdit, getSingleNote } = require('../controllers/note.controller');
const upload = require('../config/multer');

const noteRouter= express.Router();

noteRouter.post("/create", upload.single("image"), createNote)
noteRouter.get("/getAllNotes", GetAllNotes)
noteRouter.get("/getNote/:id", getSingleNote)
noteRouter.delete("/noteDelete/:id", noteDelete)
noteRouter.put("/noteEdit/:id", upload.single("image"), noteEdit)

module.exports = noteRouter;