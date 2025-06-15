# 🧩 Student Feedback System & Dynamic Portfolio Website

This repository contains two web-based projects:
1. 📊 **Online Student Feedback System** – Java-based application using JSP, Servlets, JDBC, and MySQL for collecting anonymous feedback from students.
2. 🧑‍💼 **Dynamic Portfolio Website** – A PHP-based portfolio site where content is dynamically generated from an XML file, enhanced with JavaScript for interactivity.

---

## 👨‍💻 Group Members

- **Subhadip Medya**


---

## 🧠 Project Objectives

### 📊 Online Student Feedback System
- Automate student feedback collection.
- Generate structured reports for faculty evaluation.
- Ensure secure, one-time anonymous feedback per student.

### 🌐 Dynamic Portfolio Website
- Showcase a developer's portfolio with easy XML-based updates.
- Separate content from presentation for maintainability.
- Include interactive frontend features using JavaScript.

---

## 🛠️ Tech Stack

| Module        | Technologies Used                              |
|---------------|-------------------------------------------------|
| Feedback App  | Java, JSP, Servlet, JDBC, MySQL, Apache Tomcat |
| Portfolio App | PHP, XML, JavaScript, HTML5, CSS3              |

---

## 📁 Project Structure

student-feedback-portfolio-system/
├── feedback-system/
│ ├── admin/
│ ├── faculty/
│ ├── student/
│ ├── feedback/ (Servlets + DBConnection.java)
│ ├── db/ (feedback.sql)
│ └── WEB-INF/web.xml
├── dynamic-portfolio/
│ ├── index.php
│ ├── assets/
│ ├── js/
│ ├── styles/
│ └── data/
│ └── portfolio.xml
└── README.md



---

## 🔐 Features

### 🎓 Online Feedback System

**Student**
- Secure login
- One-time feedback submission
- Course-wise feedback rating

**Faculty**
- View feedback
- Average rating report per subject

**Admin**
- Add/delete/view faculty and students
- Manage feedback data
- View aggregated reports

### 🧑‍💼 Dynamic Portfolio Website

**Backend (PHP)**
- Reads portfolio content from `portfolio.xml`
- Dynamically generates HTML sections (Projects, Skills, Experience)

**Frontend (JavaScript)**
- Interactive carousels and skill bars
- Filter projects by tags
- Contact form with validation

**Data Storage (XML)**
- Structured format for:
  - Projects (title, desc, tech, images)
  - Skills (name, proficiency)
  - Work Experience
  - Contact Info

---

## 🧪 Sample Credentials (Feedback System)

| Role    | Username | Password  |
|---------|----------|-----------|
| Admin   | admin    | admin123  |
| Faculty | f101     | facpass   |
| Student | s101     | stud123   |

⚠️ *Change these credentials before deploying to production.*

---

## 🚀 Setup Instructions

### For Feedback System

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/student-feedback-portfolio-system.git
Import into IDE (Eclipse/NetBeans)

As a Dynamic Web Project
Configure MySQL

Create a database feedback
Import feedback.sql from db/ folder

Update DB credentials in DBConnection.java
Deploy to Tomcat

Place project in webapps/
Start server and visit: http://localhost:8080/feedback-system/

For Dynamic Portfolio Website
Host on Local Server (XAMPP/LAMP)
Copy dynamic-portfolio/ folder to htdocs/

Start Apache server
Visit: http://localhost/dynamic-portfolio/

Update Portfolio
Edit data/portfolio.xml to update content (projects, skills, etc.

🔮 Future Enhancements
Email alerts (Feedback System)

Charts for visual feedback analytics

Responsive mobile-first design

OAuth Login (Google/Facebook)

Session timeout & SQL injection protection

Dark mode for Portfolio

Markdown blog section (Portfolio)






---

### ✅ Next Steps

1. **Replace placeholders**:
   - `[Add other group members here]`
   - `[Your College Name]`
   - `screens/*.png` with actual screenshot filenames.
2. **Compress both project folders** into a ZIP if needed for submission.
3. **Push to GitHub**:
   ```bash
   git init
   git remote add origin https://github.com/your-username/student-feedback-portfolio-system.git
   git add .
   git commit -m "Initial commit with Feedback System and Dynamic Portfolio"
   git push -u origin main

