# **Job Tracker - Spring Boot Application**  

This project is a **Job Application Tracking System** built using **Spring Boot**, allowing users to manage job applications efficiently. It includes **JWT authentication**, **Spring Security**, and **Spring Data JPA** for robust security and data handling.

**Currently working on the frontend to provide a complete full-stack experience!**  

---

## **Features**  

- **User Authentication & Authorization** (JWT-based security).  
- **Role-based access control** (Admin/User).  
- **CRUD operations** for job applications.  
- **Search & filter job applications** by company, position, and date.  
- **Job status tracking** (Applied, Interviewing, Accepted, Rejected).  
- **Interview scheduling & tracking**.  
- **Secure password hashing** using BCrypt.  
- **Exception handling** with a global error handler.  

---

## **Tech Stack**  

- **Backend:** Spring Boot, Spring Security (JWT), Spring Data JPA, Hibernate.  
- **Database:** PostgreSQL.  
- **Security:** JWT authentication, BCrypt password hashing.  
- **API Documentation:** Swagger.  
- **Frontend :** React.js with Material UI.  

---

## **Application Workflow**  

1. **User Registration & Login** (JWT token issued upon successful login).  
2. **Create & Manage Job Applications** (Add, Update, Delete applications).  
3. **Filter & Search Applications** by different criteria.  
4. **Track Application Status** (Automated status updates).  
5. **Schedule & Track Interviews** (Upcoming & past interviews).  

---

## **Security Measures**  

- **JWT-based authentication:** Secure API access with token validation.  
- **Password hashing:** Stored securely using **BCrypt**.  
- **Role-based access control:** Users have different permissions.  
- **CORS Configuration:** Allows frontend integration while maintaining security.  
- **Global Exception Handling:** Centralized error management.  

---

## **Possible Improvements**  

- **Email Notifications:** Send updates when interview dates approach.  
- **Job Application Reminders:** Automated reminders for follow-ups.  
- **Admin Dashboard:** More analytics and control over users & job applications.  
- **OAuth Integration:** Login via Google, GitHub, etc.  

---

## ** How to Run the Project**  

```bash
# Clone the repository
git clone https://github.com/yourusername/job-tracker.git
cd job-tracker

# Configure database connection in application.properties

# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run

# API available at:
http://localhost:8080/api
