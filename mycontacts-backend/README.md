# MyContacts Backend API

A RESTful Contact Management API built with Node.js and Express.js. Users can register, authenticate, and manage their personal contacts securely using JWT-based authentication.

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- CRUD operations for contacts
- Per-user data isolation (users can only access their own contacts)
- MongoDB via Mongoose ODM
- Centralized error handling

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt
- **Dev Tool:** nodemon

## Project Structure

```
mycontacts-backend/
├── server.js                        # Entry point
├── constants.js                     # HTTP status code constants
├── config/
│   └── dbConnection.js              # MongoDB connection setup
├── controllers/
│   ├── userController.js            # User register/login/profile logic
│   └── contactController.js        # Contact CRUD logic
├── middleware/
│   ├── validateTokenHandler.js      # JWT verification middleware
│   └── errorHandler.js             # Centralized error handler
├── models/
│   ├── userModel.js                 # User Mongoose schema
│   └── contactModel.js             # Contact Mongoose schema
└── routes/
    ├── userRoutes.js                # User routes
    └── contactRoutes.js            # Contact routes
```

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=5001
CONNECTION_STRING=<your_mongodb_connection_string>
ACCESSTOKENSECRET=<your_jwt_secret>
```

### Running the Server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:5001`

## API Endpoints

### Users

| Method | Endpoint              | Description                  | Auth Required |
|--------|-----------------------|------------------------------|---------------|
| POST   | `/api/users/register` | Register a new user          | No            |
| POST   | `/api/users/login`    | Login and receive JWT token  | No            |
| GET    | `/api/users/current`  | Get current user info        | Yes           |

### Contacts

All contact routes require a valid Bearer token in the `Authorization` header.

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/contacts`       | Get all contacts         |
| GET    | `/api/contacts/:id`   | Get a contact by ID      |
| POST   | `/api/contacts`       | Create a new contact     |
| PUT    | `/api/contacts/:id`   | Update a contact         |
| DELETE | `/api/contacts/:id`   | Delete a contact         |

### Authentication Header

```
Authorization: Bearer <your_jwt_token>
```

## Data Models

### User

| Field      | Type   | Required | Notes        |
|------------|--------|----------|--------------|
| username   | String | Yes      |              |
| email      | String | Yes      | Unique       |
| password   | String | Yes      | Hashed       |

### Contact

| Field   | Type     | Required | Notes              |
|---------|----------|----------|--------------------|
| user_id | ObjectId | Yes      | Reference to User  |
| name    | String   | Yes      |                    |
| email   | String   | Yes      |                    |
| phone   | String   | Yes      |                    |
