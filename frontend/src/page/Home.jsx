import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Card from "./Card";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const getAllNotes = async () => {
    try {
      const Notes = await axios.get("http://localhost:5000/notes/getAllNotes");
      setNotes(Notes.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
  });
  return (
    <div>
      {notes?.length > 0 ? (
        <div>
          {notes?.map((note) => (
            <Card key={note._id} note={note} />
          ))}
        </div>
      ) : (
        <div>not notes avalaible</div>
      )}
    </div>
  );
}
