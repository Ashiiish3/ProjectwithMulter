import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditNote() {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [image, setImage] = useState("");
  const getNote = async () => {
    try {
      const note = await axios.get(`http://localhost:5000/notes/getNote/${id}`);
      setNote(note.data.note);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", note.title);
    formData.append("content", note.content);
    formData.append("image", image);

    try {
      await axios.put(`http://localhost:5000/notes/noteEdit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Note updated successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update note");
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto mt-10 space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Update Note
      </h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={note.title || ""}
          onChange={(e) => handleChange(e)}
          required
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Content</label>
        <textarea
          value={note.content || ""}
          name="content"
          onChange={(e) => handleChange(e)}
          required
          rows="4"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
}
