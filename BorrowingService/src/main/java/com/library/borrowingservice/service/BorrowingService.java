package com.library.borrowingservice.service;

import com.library.borrowingservice.client.BookClient;
import com.library.borrowingservice.entity.BorrowingRecord;
import com.library.borrowingservice.repository.BorrowingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowingService {

    @Autowired
    private BorrowingRepository borrowingRepository;

    @Autowired
    private BookClient bookClient;

    public BorrowingRecord borrowBook(Long bookId, String userId) {
        // 1. Verify book availability (Communication with BookService)
        // For now trusting the call or catching error if book not found
        // In real impl, we check status.

        // 2. Create Record
        BorrowingRecord record = new BorrowingRecord();
        record.setBookId(bookId);
        record.setUserId(userId);
        record.setBorrowDate(LocalDate.now());
        record.setStatus("BORROWED");

        // 3. Update Book Status to UNAVAILABLE
        try {
            bookClient.updateBookStatus(bookId, "UNAVAILABLE");
        } catch (Exception e) {
            // Log error, maybe fallback
            System.err.println("Failed to update book status: " + e.getMessage());
        }

        return borrowingRepository.save(record);
    }

    public BorrowingRecord returnBook(Long borrowId) {
        BorrowingRecord record = borrowingRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrowing record not found"));

        record.setReturnDate(LocalDate.now());
        record.setStatus("RETURNED");

        // Update Book Status to AVAILABLE
        try {
            bookClient.updateBookStatus(record.getBookId(), "AVAILABLE");
        } catch (Exception e) {
            System.err.println("Failed to update book status: " + e.getMessage());
        }

        return borrowingRepository.save(record);
    }

    public List<BorrowingRecord> getMyBorrowings(String userId) {
        return borrowingRepository.findByUserId(userId);
    }
}
