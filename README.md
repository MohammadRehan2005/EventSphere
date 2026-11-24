# EventSphere

> A full-stack event management platform built with the MERN stack for creating, discovering, registering for, and managing events with online payments, digital QR tickets, and attendee check-in.

## 📌 Overview

**EventSphere** is a full-stack event management platform designed to simplify the complete event registration and management process.

The platform provides separate functionality for **attendees** and **administrators**. Users can browse events, register for events, make online payments, receive digital tickets with unique QR codes, and use those QR codes for event check-in. Administrators can manage events, monitor registrations, view attendees, and handle event operations through an admin dashboard.

The project was developed using the **MERN stack** with REST APIs, JWT authentication, MongoDB, Razorpay payments, and QR-code-based ticketing.

---

## ✨ Features

### 👤 User Features

* User registration and login
* JWT-based authentication
* Browse available events
* View event details
* Register/book an event
* Online payment using Razorpay
* Digital ticket generation
* Unique QR code for each ticket
* View registered events and tickets
* QR-based event check-in

### 🛠️ Admin Features

* Admin authentication
* Admin dashboard
* Create and manage events
* View registered attendees
* Monitor event registrations
* View event-related analytics
* Manage attendee information
* Scan attendee QR codes for check-in

### 💳 Payment System

EventSphere integrates **Razorpay** for online event payments.

The payment workflow includes:

```text
Select Event
     ↓
Register / Book Event
     ↓
Create Payment
     ↓
Razorpay Checkout
     ↓
Payment Verification
     ↓
Generate Digital Ticket
     ↓
Generate Unique QR Code
```

### 🎟️ QR Ticket & Check-in

After successful registration and payment, EventSphere generates a digital ticket containing a unique QR code.

The QR code can be scanned by authorized administrators to verify the attendee and record their event check-in.

```text
User Registration
       ↓
Payment Successful
       ↓
Digital Ticket
       ↓
Unique QR Code
       ↓
Admin Scanner
       ↓
Attendee Check-in
```

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* REST API integration
* QR code generation/scanning

### Backend

* Node.js
* Express.js
* RESTful APIs
* JWT Authentication
* JavaScript

### Database

* MongoDB
* Mongoose

### Integrations

* Razorpay — Online payments
* QR Code — Digital tickets and attendee check-in

### Development Tools

* Git
* GitHub
* npm
* VS Code

---

## 🏗️ Project Architecture

EventSphere follows a separate frontend/backend architecture:

```text
EventSphere/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

> The exact folder structure may vary depending on the current version of the project.

---

## 🔐 Authentication

EventSphere uses **JSON Web Tokens (JWT)** for authentication.

The authentication flow is:

```text
User Login
    ↓
Backend validates credentials
    ↓
JWT generated
    ↓
Token stored on client
    ↓
Token sent with protected API requests
    ↓
Backend verifies token
    ↓
Access granted
```

Protected functionality includes authenticated user operations and administrative operations.

---

## 🔌 REST API

The backend provides REST APIs for the major application workflows.

Major API areas include:

* Authentication
* User management
* Event management
* Event registration
* Payment processing
* Ticket generation
* User ticket retrieval
* Attendee management
* QR check-in
* Admin operations
* Analytics

---

## 🗄️ Database

MongoDB is used as the primary database.

The application stores information related to:

* Users
* Events
* Registrations
* Payments
* Tickets
* Attendees
* Check-in information

Mongoose is used for database interaction and schema management.

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/MohammadRehan2005/EventSphere.git

cd EventSphere
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the backend directory.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

FRONTEND_URL=your_frontend_url
```

> Use the actual environment variable names defined in the current backend code. Never commit API keys, database credentials, or other secrets to GitHub.

### 5. Start the backend

```bash
cd backend
npm run dev
```

If the project uses a different development script, use the script defined in `backend/package.json`.

### 6. Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will then be available at the local development URL shown by Vite/your configured development server.

---

## 🔄 Application Workflow

### User Workflow

```text
Register / Login
       ↓
Browse Events
       ↓
Select Event
       ↓
Register for Event
       ↓
Make Payment
       ↓
Payment Verification
       ↓
Ticket Generated
       ↓
QR Code Generated
       ↓
View Ticket
       ↓
Attend Event
       ↓
QR Code Scanned
       ↓
Check-in Confirmed
```

### Admin Workflow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Create / Manage Events
     ↓
Monitor Registrations
     ↓
View Attendees
     ↓
Scan QR Codes
     ↓
Confirm Check-in
```

---

## 📊 Key Project Highlights

* Full-stack MERN application
* Separate frontend and backend architecture
* RESTful API-based communication
* JWT-based authentication and authorization
* MongoDB database integration
* Razorpay payment integration
* Digital ticket generation
* Unique QR-code ticketing
* QR-based attendee check-in
* Admin dashboard and event management
* Attendee and registration management
* Event analytics

---

## 🎯 Project Objectives

The primary objectives of EventSphere are:

1. Simplify event discovery and registration.
2. Provide a digital alternative to physical event tickets.
3. Enable secure online event payments.
4. Automate ticket generation after successful registration.
5. Reduce manual attendee verification through QR-code scanning.
6. Provide administrators with tools to manage events and attendees.
7. Centralize event, registration, ticket, and attendee information.

---

## 🚀 Future Improvements

Potential improvements include:

* Email confirmation and ticket delivery
* Push notifications
* Advanced event search and filtering
* Event categories
* Event reviews and ratings
* Improved analytics and reporting
* Automated payment refund workflows
* Cloud-based image/file storage
* Production deployment and monitoring
* Role-based access control with additional administrative roles

---

## 👨‍💻 Author

**Mohammad Rehan**

BCA Graduate | MERN Stack Developer

* GitHub: https://github.com/MohammadRehan2005
* LinkedIn: https://www.linkedin.com/in/mohammad-rehan-b8654433b

---

## 📄 License

This project was developed as a personal/academic full-stack web development project.

---

⭐ If you find this project useful, consider giving the repository a star.
