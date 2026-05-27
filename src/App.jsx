import React, { useState, useEffect } from "react";
import BookCard from "./components/BookCard";
import BookModal from "./components/BookModal";
import { getBooks, addBook, updateBook, deleteBook } from "./services/bookService";

const App = () => {
  const [books, setBooks]         = useState([]);
  const [search, setSearch]       = useState("");
  const [genre, setGenre]         = useState("All");
  const [selectedBook, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading]     = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch {
      alert("Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (form) => {
    try {
      if (selectedBook) await updateBook(selectedBook.id, form);
      else await addBook(form);
      setSelected(null);
      await load();
    } catch {
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    await deleteBook(id);
    await load();
  };

  const genres = ["All", ...new Set(books.map(b => b.genre))];

  const filtered = books.filter(b => {
    const q = search.toLowerCase();
    return (
      b.title?.toLowerCase().includes(q) ||
      b.author?.toLowerCase().includes(q)
    ) && (genre === "All" || b.genre === genre);
  });

  return (
    <div className="container">
      <div className="header">
        <h1>Book Management System</h1>
        <button type="button" onClick={() => { setSelected(null); setModalOpen(true); }}>
          + Add Book
        </button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={genre} onChange={e => setGenre(e.target.value)}>
          {genres.map((g, i) => (
            <option key={i} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <BookModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelected(null); }}
        onSubmit={handleSubmit}
        selectedBook={selectedBook}
      />

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="book-grid">
          {filtered.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={(b) => { setSelected(b); setModalOpen(true); }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;