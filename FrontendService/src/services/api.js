import axios from 'axios';

const AUTH_URL = 'http://localhost:9001/auth';
const BOOK_URL = 'http://localhost:9002/books';
const BORROW_URL = 'http://localhost:9003/borrowings';

// Auth API
export const authApi = {
    register: (user) => axios.post(`${AUTH_URL}/register`, user),
    login: (credentials) => axios.post(`${AUTH_URL}/token`, credentials), // Send { username, password } as JSON body
    validateToken: (token) => axios.get(`${AUTH_URL}/validate`, { params: { token } })
};

// Book API
export const bookApi = {
    getAllBooks: () => axios.get(BOOK_URL),
    getBookById: (id) => axios.get(`${BOOK_URL}/${id}`),
    searchBooks: (isbn) => axios.get(`${BOOK_URL}/availability/${isbn}`),
    addBook: (book, token) => axios.post(BOOK_URL, book, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

// Borrowing API
export const borrowApi = {
    borrowBook: (bookId, userId) => axios.post(`${BORROW_URL}/${bookId}`, null, { params: { userId } }),
    returnBook: (borrowId) => axios.post(`${BORROW_URL}/return/${borrowId}`),
    getMyBorrowings: (userId) => axios.get(`${BORROW_URL}/my`, { params: { userId } }),
};
