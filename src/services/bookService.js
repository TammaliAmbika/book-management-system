import axios from "axios";

const API_URL = "https://6a15caa691ff9a63de08ce84.mockapi.io/api/books";

export const getBooks   = () => axios.get(API_URL);
export const addBook    = (book) => axios.post(API_URL, book);
export const updateBook = (id, book) => axios.put(`${API_URL}/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);