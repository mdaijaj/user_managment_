User Management API

A secure REST API built with NestJS for user registration and login using mobile number and password credentials. This API is designed to be easily integrated with frontend applications, providing a structured JSON response format and enforcing robust security measures.

Objective

Implement user signup and login endpoints with detailed user information returned (excluding sensitive details like passwords).
Ensure password security by using hashing techniques.
Leverage TypeScript for type safety.
Ensure seamless database interactions using MySQL (or preferred database).
Technologies Used

NestJS - Backend framework
TypeScript - Programming language
MySQL - Relational database (or preferred alternative)
bcrypt - For password hashing
Database Setup

Create a MySQL database named employees.
Create a users table with the following schema:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT FALSE,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
API Endpoints

Signup API (POST /signup)
Request Body:
name - User's full name
mobile - User's unique mobile number
password - User's chosen password
Response:
JSON response with the new user’s details (excluding password).
Functionality:
Validates uniqueness of the mobile number.
Hashes the password securely with bcrypt.
Inserts the new user into the database.
Returns a success response with user details (excluding password).
Login API (POST /login)
Request Body:
mobile - User's unique mobile number
password - User's password
Response:
JSON response with user details (excluding password) if login is successful.
Error response if credentials are invalid.
Functionality:
Validates mobile number and password.
Retrieves the user from the database.
Verifies the password using bcrypt.
Returns a success response with user details (excluding password) on successful login.
Project Setup

Clone the repository and navigate to the project directory:
git clone https://github.com/yourusername/user-management-api.git
cd user-management-api
Install dependencies:
npm install
Set up environment variables (e.g., database connection settings) in .env:
DATABASE_HOST=localhost
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=employees
Run the database migrations or sync to ensure the users table is created.
Start the server:
npm run start
Security Considerations

Password Hashing: Passwords are hashed using bcrypt for secure storage.
Rate Limiting: Implement rate limiting to prevent brute-force attacks (not covered here, but recommended).
Input Validation: Use ValidationPipe to validate and sanitize user input.
Authentication: For session management, consider JWT or another authentication strategy for production use.
Testing

Unit Tests: Write tests for controllers, services, and entities to verify proper functionality and error handling.
Integration Tests: Use Jest or similar frameworks to simulate API requests and ensure correct response handling.
Example JSON Response

For both login and signup requests (on success):

{
    "id": 1,
    "name": "John Doe",
    "mobile": "******1234",
    "status": true
}
Additional Notes

The mobile number is partially masked in responses for security.
Ensure to exclude sensitive fields like password in all responses.