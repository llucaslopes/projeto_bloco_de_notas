import React, { useState, useEffect } from 'react';

function NoteForm(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onNoteAdd({ title, content, category });
    setTitle('');
    setContent('');
    setCategory('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
      <textarea placeholder="Content" value={content} onChange={handleContentChange} />
      <input type="text" placeholder="Category" value={category} onChange={handleCategoryChange} />
      <button type="submit">Save</button>
    </form>
  );
}

function NoteList(props) {
  return (
    <ul>
      {props.notes.map((note, index) => (
        <li key={index}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p>{note.category}</p>
        </li>
      ))}
    </ul>
  );
}

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    props.onSearchTermChange(searchTerm);
  }, [searchTerm]);

  return (
    <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchTermChange} />
  );
}

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNoteAdd = (newNote) => {
    setNotes([...notes, newNote]); // add newNote to the end of notes array
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(searchTerm.toLowerCase()); // filter notes based on title matching searchTerm
  });

  return (
    <div>
      <h1>My Notes</h1>
      <NoteForm onNoteAdd={handleNoteAdd} />
      <SearchBar onSearchTermChange={setSearchTerm} />
      <NoteList notes={filteredNotes} />
    </div>
  );
}

export default App