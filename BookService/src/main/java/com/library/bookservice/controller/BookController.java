package com.library.bookservice.controller;

import com.library.bookservice.entity.Book;
import com.library.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class BookController {

    @Autowired
    private BookService service;

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return service.saveBook(book);
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return service.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return service.getBookById(id);
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        return service.updateBook(id, book);
    }

    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
        return "Book deleted successfully";
    }

    @GetMapping("/availability/{isbn}")
    public String getAvailability(@PathVariable String isbn) {
        return service.getBookAvailability(isbn);
    }

    @PostMapping("/copy/{isbn}")
    public Book addCopy(@PathVariable String isbn) {
        return service.addCopy(isbn);
    }

    @PutMapping("/borrow/{isbn}")
    public Long borrowBook(@PathVariable String isbn) {
        return service.borrowBookByIsbn(isbn);
    }

    @PutMapping("/return/{bookId}")
    public String returnBook(@PathVariable Long bookId) {
        service.returnBookById(bookId);
        return "Book returned successfully";
    }
}
