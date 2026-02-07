# Library Management System

A modern, microservices-based application for managing library operations. Built with Spring Boot, React, and PostgreSQL.

## 🚀 Features

-   **User Authentication**: Secure registration and login using JWT.
-   **Role-Based Access**: distinct roles for Admins and Students/Users.
-   **Book Management**:
    -   Browse books with a beautiful, responsive UI.
    -   **Search**: Filter books by title, author, or genre instantly.
    -   **Details View**: Dedicated page for full book information.
    -   **Admin**: Add, update, and remove books.
-   **Borrowing System**:
    -   **Request**: Users can request to borrow books.
    -   **Approve/Return**: Admins approve requests and mark books as returned.
    -   **History**: Admins can view complete borrowing history with filters and search.
    -   **Dashboard**: Users can track their borrowed books and due dates.
-   **Public Access**: Browse the library without logging in (Login required to borrow).

## 🏗️ Architecture

The system is built using a Microservices architecture:

| Service | Port | Description |
| :--- | :--- | :--- |
| **Eureka Server** | `8761` | Service Registry for microservices discovery. |
| **Auth Service** | `9001` | Handles user registration, login, and JWT generation. |
| **Book Service** | `9002` | Manages book inventory and details. |
| **Borrowing Service** | `9003` | Handles borrowing logic, requests, and history. |
| **Frontend Service** | `5173` | React + Vite application for the user interface. |

## 🛠️ Tech Stack

-   **Backend**: Java, Spring Boot, Spring Cloud (Eureka), Spring Security, Hibernate/JPA.
-   **Frontend**: React, Vite, Tailwind CSS, Framer Motion (Animations), Axios.
-   **Database**: PostgreSQL.

## ⚙️ Setup & Installation

### Prerequisites
-   Java 17+
-   Node.js & npm
-   PostgreSQL
-   Maven

### 1. Database Setup
Ensure PostgreSQL is running and create the necessary databases (or configure services to create them):
-   `auth_db`
-   `book_db`
-   `borrowing_db`
*(Check `application.yml` in each service for exact database names and credentials)*

### 2. Start Microservices
Order of startup is important. Open separate terminals for each:

1.  **Eureka Server**:
    ```bash
    cd EurekaServer
    mvn spring-boot:run
    ```
2.  **Auth Service**:
    ```bash
    cd AuthService
    mvn spring-boot:run
    ```
3.  **Book Service**:
    ```bash
    cd BookService
    mvn spring-boot:run
    ```
4.  **Borrowing Service**:
    ```bash
    cd BorrowingService
    mvn spring-boot:run
    ```

### 3. Start Frontend
```bash
cd FrontendService
npm install
npm run dev
```

## 📝 Usage

1.  Open your browser and navigate to `http://localhost:5173`.
2.  **Browse**: Exploring books is public.
3.  **Register/Login**: Create an account to borrow books.
4.  **Admin Access**: Login with admin credentials to access the "Add Book", "Pending Requests", and "History" features.

## 🤝 Contribution

Feel free to fork this repository and submit pull requests.
