import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Card({ note }) {
  const Navigate = useNavigate();

  const DeleteNote = async (id) => {
    try {
      // console.log(id)
      await axios.delete(`http://localhost:5000/notes/noteDelete/${id}`)
      alert("Note deleted successfully");
      // window.location.reload();
      Navigate('/')
    } catch (error) {
      console.error("Error deleting note:", error);
      
    }
  }


  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm mx-auto">
      <img
        src={`http://localhost:5000/${note.image}`}
        alt="Note"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
      <p className="text-gray-600 mb-4">{note.content}</p>
      <div className="flex justify-between">
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={() => DeleteNote(note._id)}>
          Delete
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          <Link to={`/editnote/${note._id}`} >Edit</Link>
        </button>
      </div>
    </div>
  );
}
