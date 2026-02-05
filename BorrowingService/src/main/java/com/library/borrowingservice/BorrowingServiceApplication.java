package com.library.borrowingservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BorrowingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BorrowingServiceApplication.class, args);
    }

}
