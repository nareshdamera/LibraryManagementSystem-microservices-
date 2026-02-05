package com.library.borrowingservice.repository;

import com.library.borrowingservice.entity.BorrowingRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
// import java.util.Optional;

@Repository
public interface BorrowingRepository extends JpaRepository<BorrowingRecord, Long> {
    List<BorrowingRecord> findByUserId(String userId);

    List<BorrowingRecord> findByBookIdAndStatus(Long bookId, String status);
}
