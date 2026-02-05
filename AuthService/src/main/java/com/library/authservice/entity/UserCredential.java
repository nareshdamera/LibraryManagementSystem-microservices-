package com.library.authservice.entity;

import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // creates the getters and setters (from lombok)
@AllArgsConstructor // creates the constructor with all the fields (from lombok)
@NoArgsConstructor // creates the constructor with no arguments (from lombok)
public class UserCredential {

    @Id
    private String studentId;
    private String name;
    private String email;
    private String password;
    private String role; // ADMIN or STUDENT
}
