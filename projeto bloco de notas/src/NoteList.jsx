import React from "react";
import Note from "./Note";
import './style.css'

function NoteList(props) {
  return (
    <div className="note-list">
      {props.notes.map((note) => (
        <Note key={note.id} title={note.title} content={note.content} />
      ))}
    </div>
  );
}

export default NoteList;
