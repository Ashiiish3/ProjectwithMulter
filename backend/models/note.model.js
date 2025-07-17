const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: String,
    content: String,
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg"
    }
})


const noteModel = mongoose.model("note", noteSchema)

module.exports = noteModel;