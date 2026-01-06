import Note from "../model/Note.js";
//get is the request get method req = request, res = response. Response is sending when we 
//get/fetch from the port
//api/notes is the directory after the home address
// the URL + HTTP method (GET,POST,etc.) = an Endpoint

export async function getAllNotes(_, res) { //async to write promises that the program will wait for before execution while it runs other functions. Use '_' in params where not used
    //res.status(200).send("Note Fetched");
    try {
        const notes = await Note.find().sort({createdAt:-1}); // find method to get all notes and sort by newest first (1 is ascending - oldest first)
        res.status(200).json(notes); // respond with the notes in JSON format

    } catch (error) {
        console.error("Error in getAllNotes controller:", error);
        res.status(500).json({ message: "Internal Server Error (500)" });
    }
}// this is a route. 

export async function getNoteById(req, res) { 
    try {
        const note = await Note.findById(req.params.id); // find method to get all notes
        if (!note) return res.status(404).json({ message: "Note Not Found" }); // if wrong id
        res.status(200).json(note); // respond with the notes in JSON format

    } catch (error) {
        console.error("Error in getNoteById controller:", error);
        res.status(500).json({ message: "Internal Server Error (500)" });
    }
}

export async function createNote(req, res) { // to create we need to pass the title and content from the page body
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title: title, content: content }); // can directly write {title, content} if the key and value are same

        //await newNote.save(); // function waits till created in db
        //^ we can also directly save it as a const and show the note in the message:
        const savedNote = await newNote.save();
        res.status(201).json({ message: "Note created successfully", savedNote });
        console.log(title, content); // cannot use directly without express.json middleware in server.js

    } catch (error) {
        console.error("Error in createNote controller:", error);
        res.status(500).json({ message: "Internal Server Error (500)" });
    }
}

export async function updateNote(req, res) { // for PUT and DELETE we'd need the id
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true }); // this id in req.params.id is the router.put("/:id", updateNote); in noteRoutes.js
        if (!updatedNote) return res.status(404).json({ message: "Note Not Found" }); // if wrong id
        res.status(200).json(updatedNote);

    } catch (error) {
        console.error("Error in updateNote controller:", error);
        res.status(500).json({ message: "Internal Server Error (500)" });
    }


}

export async function deleteNote(req, res) { // we can use wrapper functions for catches but using try-catch for now
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id); 
        if (!deletedNote) return res.status(404).json({ message: "Note Not Found" }); // if wrong id
        res.status(200).json(deletedNote);

    } catch (error) {
        console.error("Error in deleteNote controller:", error);
        res.status(500).json({ message: "Internal Server Error (500)" });
    }
}