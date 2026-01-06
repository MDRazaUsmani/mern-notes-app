import mongoose from "mongoose";

//1. create schema
const noteSchema =new mongoose.Schema({//objects of schema
    //include all the required contents of a note like title, contents, date,etc.
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        }
    },
    { timestamps:true } // setting this to true will automatically provide created and updated at times 
);

//2. Create a model based on the schema
const Note = mongoose.model("Note", noteSchema); //const name convention <--

export default Note;