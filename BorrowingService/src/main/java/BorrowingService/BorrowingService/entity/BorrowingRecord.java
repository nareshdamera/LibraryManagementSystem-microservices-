package BorrowingService.BorrowingService.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BorrowingRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId; // Coming from AuthService token
    private String isbn;
    private Long bookId; // Assigned when issued
    private String status; // PENDING, ISSUED, RETURNED
    
    private LocalDate requestDate;
    private LocalDate issueDate;
    private LocalDate returnDate;
}
