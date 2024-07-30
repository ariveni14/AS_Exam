import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    if(notes.length !== 0){
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const handleAddOrEditNote = () => {
    if (currentNote.trim() === "") return;

    if (isEditing && editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = currentNote;
      setNotes(updatedNotes);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setNotes((prevNotes) => [...prevNotes, currentNote]);
    }

    setCurrentNote("");
    
  };

  const handleEditNote = (index) => {
    setCurrentNote(notes[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <motion.h1
          className="text-2xl font-bold mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Chatbox Notes
        </motion.h1>
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Type your note here..."
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
          <button
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={handleAddOrEditNote}
          >
            {isEditing ? "Edit Note" : "Save Note"}
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {notes.map((note, index) => (
            <motion.div
              key={index}
              className="bg-gray-200 p-3 rounded-md shadow-sm flex justify-between items-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span>{note}</span>
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEditNote(index)}
              >
                Edit
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
