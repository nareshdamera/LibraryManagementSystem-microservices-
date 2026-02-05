package com.library.authservice.service;

import com.library.authservice.entity.UserCredential;
import java.util.HashMap;
import java.util.Map;
import com.library.authservice.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserCredentialRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public String saveUser(UserCredential credential) {
        credential.setPassword(passwordEncoder.encode(credential.getPassword()));
        repository.save(credential);
        return "user added to the system";
    }

    public String generateToken(String email) {
        // The "email" parameter is actually the email sent from the frontend
        UserCredential user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getName());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());
        claims.put("studentId", user.getStudentId());
        return jwtService.generateToken(email, claims);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }
}
