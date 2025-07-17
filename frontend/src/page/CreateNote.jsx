import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNote() {
  const Navigate = useNavigate();
  const [image, setImage] = useState("")
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", note.title)
    formData.append("content", note.content)
    formData.append("image", image)

    try {
      const note = await axios.post("http://localhost:5000/notes/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      console.log(note.data, "Note created successfully");
      Navigate("/")
    } catch (error) {
      console.log(error);
      alert("Failed to create note");
      
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Add a Note</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />

      <textarea
        name="content"
        placeholder="Content"
        value={note.content}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        rows="4"
        required
      ></textarea>

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={(e)=> setImage(e.target.files[0])}
        className="mb-4"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
