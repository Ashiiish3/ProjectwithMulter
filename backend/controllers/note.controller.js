const noteModel = require("../models/note.model");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(req.file);
    if (!title || !content) {
      return res.json("all field required.");
    }
    if (req.file) {
      const newNote = await noteModel.create({
        title,
        content,
        image: req?.file?.filename,
      });
      res.json({ message: "Note created successfully", note: newNote }, { new: true });
    } else {
      const newNote = await noteModel.create({ title, content });
      res.json({ message: "Note created successfully", note: newNote }, { new: true });
    }
  } catch (error) {
    console.log(error);
  }
};

const GetAllNotes = async (req, res) => {
  try {
    const Notes = await noteModel.find();
    return res.json({
      message: "All notes fetched successfully",
      notes: Notes,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
};


const getSingleNote= async (req, res) => {
  const { id } = req.params;
  try {
    const note = await noteModel.findById(id)
    if (!note) {
      return res.json({ message: "Note not found" });
    }
    return res.json({ message: "Note fetched successfully", note });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
    
  }
}


const noteDelete = async (req, res)=>{
    const { id} = req.params;
    try {
        const note = await noteModel.findById(id)
        if(!note) {
            return res.json({ message: "Note not found" });
        }
        await noteModel.findByIdAndDelete(id);
        return res.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal Server Error" });
        
    }
}


const noteEdit = async (req, res) => {
    const {id} = req.params;
    const { title, content } = req.body;
    try {
        if(!title || !content){
            return res.json({ message: "All fields are required" });
        }
        const note = await noteModel.findById(id)
        if(!note) {
            return res.json({ message: "Note not found" });
        }
        if(req.file){
            const updatedNote = await noteModel.findByIdAndUpdate(id, {title, content, image: req.file.filename});
            return res.json({ message: "Note updated successfully", note: updatedNote }, { new: true });
        }
        else{
            const updatedNote = await noteModel.findByIdAndUpdate(id,{title, content})
            return res.json({ message: "Note updated successfully", note: updatedNote },{ new: true });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = { createNote, GetAllNotes, noteDelete,noteEdit, getSingleNote };