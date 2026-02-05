package com.library.bookservice.service;

import com.library.bookservice.entity.Book;
import com.library.bookservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository repository;

    public Book saveBook(Book book) {
        book.setStatus("AVAILABLE");
        return repository.save(book);
    }

    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    public Book getBookById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }

    public Book updateBook(Long id, Book bookDetails) {
        Book book = getBookById(id);
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setGenre(bookDetails.getGenre());
        book.setIsbn(bookDetails.getIsbn());
        book.setImageUrl(bookDetails.getImageUrl());
        book.setDescription(bookDetails.getDescription());
        return repository.save(book);
    }

    public void deleteBook(Long id) {
        repository.deleteById(id);
    }

    public String getBookAvailability(String isbn) {
        long totalCopies = repository.countByIsbn(isbn);
        long availableCopies = repository.countByIsbnAndStatus(isbn, "AVAILABLE");
        return String.format("Total Copies: %d, Available: %d", totalCopies, availableCopies);
    }

    public Book addCopy(String isbn) {
        List<Book> existingBooks = repository.findByIsbn(isbn);
        if (existingBooks.isEmpty()) {
            throw new RuntimeException("No book found with ISBN: " + isbn);
        }
        Book existingBook = existingBooks.get(0); // Get metadata from the first copy

        Book newCopy = new Book();
        newCopy.setTitle(existingBook.getTitle());
        newCopy.setAuthor(existingBook.getAuthor());
        newCopy.setGenre(existingBook.getGenre());
        newCopy.setIsbn(existingBook.getIsbn());
        newCopy.setImageUrl(existingBook.getImageUrl());
        newCopy.setDescription(existingBook.getDescription());
        newCopy.setStatus("AVAILABLE");

        return repository.save(newCopy);
    }

    public void updateBookStatus(Long id, String status) {
        Book book = getBookById(id);
        book.setStatus(status);
        repository.save(book);
    }

    public Long borrowBookByIsbn(String isbn) {
        Book book = repository.findFirstByIsbnAndStatus(isbn, "AVAILABLE")
                .orElseThrow(() -> new RuntimeException("No available copies for ISBN: " + isbn));
        book.setStatus("BORROWED");
        repository.save(book);
        return book.getId();
    }

    public void returnBookById(Long id) {
        Book book = getBookById(id);
        book.setStatus("AVAILABLE");
        repository.save(book);
    }
}
