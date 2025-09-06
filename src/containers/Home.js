import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { BsTrash } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) return;

      try {
        const notes = await loadNotes();
        const notesWithAttachments = await Promise.all(
          notes.map(async (note) => {
            if (note.attachment) {
              try {
                const url = await Storage.vault.get(note.attachment);
                return { ...note, attachmentUrl: url };
              } catch (err) {
                console.error("Error fetching attachment URL:", err);
                return { ...note, attachmentUrl: null };
              }
            }
            return note;
          })
        );

        setNotes(notesWithAttachments);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  async function loadNotes() {
    return API.get("notes", "/notes");
  }

  async function handleDelete(noteId) {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    try {
      await API.del("notes", `/notes/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.noteId !== noteId));
    } catch (e) {
      onError(e);
    }
  }

  function renderNotesList(notes) {
    return (
      <div className="notes">
        {notes.map(({ noteId, content, createdAt, attachmentUrl }) => (
          <div key={noteId} className="note-card">
            {attachmentUrl && <img src={attachmentUrl} alt="thumb" />}
            <div className="note-title">{content.trim().split("\n")[0]}</div>
            <div className="note-date">
              Created: {new Date(createdAt).toLocaleString()}
            </div>
            <div className="note-card-footer">
              <LinkContainer to={`/notes/${noteId}`}>
                <span style={{ cursor: "pointer", color: "#06b6d4" }}>Open</span>
              </LinkContainer>
              <BsTrash
                className="note-delete"
                size={18}
                onClick={() => handleDelete(noteId)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>WriteNote</h1>
        <p className="text-muted">A simple & easy note taking website</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes-wrapper">
        {/* Header Row */}
        <div className="notes-header">
          <h2>Your Notes</h2>
          <LinkContainer to="/notes/new">
            <button className="new-note-btn">+ Create New Note</button>
          </LinkContainer>
        </div>

        {!isLoading && renderNotesList(notes)}
      </div>
    );
  }

  return <div className="Home">{isAuthenticated ? renderNotes() : renderLander()}</div>;
}
