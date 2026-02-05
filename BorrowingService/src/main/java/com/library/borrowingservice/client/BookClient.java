package com.library.borrowingservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "book-service")
public interface BookClient {

    @GetMapping("/books/{id}")
    Object getBookById(@PathVariable("id") Long id); // Returning Object for now, can map to DTO

    @PutMapping("/books/{id}/status")
    void updateBookStatus(@PathVariable("id") Long id, @RequestParam("status") String status);
}
