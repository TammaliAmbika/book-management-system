import React from "react";

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="card">
      <h3>{book.title}</h3>
      <p><strong>Author</strong> {book.author}</p>
      <p><strong>Genre</strong> {book.genre}</p>
      <p><strong>Year</strong> {book.year}</p>
      <div>
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => onDelete(book.id)}>Delete</button>
      </div>
    </div>
  );
};

export default BookCard;