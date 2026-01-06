import express from "express"

import {createNote, getAllNotes, getNoteById, updateNote, deleteNote} from "../controller/notesController.js"
const router = express.Router();


router.get("/", getAllNotes); 
router.get("/:id", getNoteById); 
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id",deleteNote); //just using "/" because the app in server.js has already defined/prefixed the api/notes URL


export default router;