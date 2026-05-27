import React, { useState, useEffect } from "react";

const EMPTY = { title: "", author: "", genre: "", year: "" };

const BookModal = ({ isOpen, onClose, onSubmit, selectedBook }) => {
  const [form, setForm] = useState(EMPTY);
  const isEdit = Boolean(selectedBook);

  useEffect(() => {
    setForm(isOpen && selectedBook ? selectedBook : EMPTY);
  }, [isOpen, selectedBook]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.title || !form.author || !form.genre || !form.year) {
      alert("Please fill in all fields.");
      return;
    }
    await onSubmit(form);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(28,24,20,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999, padding: "20px"
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="form-container" style={{ width: "100%", maxWidth: 480, margin: 0 }}>
        <button
          type="button"
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--ink-muted)" }}
        >✕</button>

        <h2>{isEdit ? "Edit Book" : "Add Book"}</h2>

        <form>
          <input name="title"  placeholder="Title"            value={form.title}  onChange={handleChange} />
          <input name="author" placeholder="Author"           value={form.author} onChange={handleChange} />
          <input name="genre"  placeholder="Genre"            value={form.genre}  onChange={handleChange} />
          <input name="year"   placeholder="Publication Year" value={form.year}   onChange={handleChange} type="number" />
          <button type="button" onClick={handleSubmit}>{isEdit ? "Update Book" : "Add Book"}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default BookModal;