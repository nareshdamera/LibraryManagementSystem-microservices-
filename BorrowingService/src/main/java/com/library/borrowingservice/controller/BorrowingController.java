package com.library.borrowingservice.controller;

import com.library.borrowingservice.entity.BorrowingRecord;
import com.library.borrowingservice.service.BorrowingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/borrowings")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class BorrowingController {

    @Autowired
    private BorrowingService borrowingService;

    // POST /borrowings/{bookId}?userId=...
    @PostMapping("/{bookId}")
    public ResponseEntity<BorrowingRecord> borrowBook(@PathVariable Long bookId, @RequestParam String userId) {
        return ResponseEntity.ok(borrowingService.borrowBook(bookId, userId));
    }

    // POST /borrowings/return/{id}
    @PostMapping("/return/{id}")
    public ResponseEntity<BorrowingRecord> returnBook(@PathVariable Long id) {
        return ResponseEntity.ok(borrowingService.returnBook(id));
    }

    @GetMapping("/my")
    public ResponseEntity<List<BorrowingRecord>> getMyBorrowings(@RequestParam String userId) {
        return ResponseEntity.ok(borrowingService.getMyBorrowings(userId));
    }

    // GET /borrowings/requests
    @GetMapping("/requests")
    public ResponseEntity<List<BorrowingRecord>> getPendingRequests() {
        return ResponseEntity.ok(borrowingService.getPendingRequests());
    }

    // PUT /borrowings/{borrowId}/approve
    @PutMapping("/{borrowId}/approve")
    public ResponseEntity<BorrowingRecord> approveBorrow(@PathVariable Long borrowId) {
        return ResponseEntity.ok(borrowingService.approveBorrow(borrowId));
    }

    // GET /borrowings/all
    @GetMapping("/all")
    public ResponseEntity<List<BorrowingRecord>> getAllBorrowings() {
        return ResponseEntity.ok(borrowingService.getAllBorrowings());
    }
}
