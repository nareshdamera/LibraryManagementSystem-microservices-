package com.library.bookservice.repository;

import com.library.bookservice.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByIsbn(String isbn);

    long countByIsbn(String isbn);

    long countByIsbnAndStatus(String isbn, String status);

    java.util.Optional<Book> findFirstByIsbnAndStatus(String isbn, String status);
}
