# 🚀 Backend API Documentation

Base URL:  
http://localhost:4000

---

# 👤 User APIs

---

## 📌 1. Register User

### 🔗 Endpoint

POST /users/register

### 📖 Description

Register a new user by providing full name, email, and password.

- Validates input using `express-validator`
- Hashes password before saving
- Returns user data and JWT token

---

### 📥 Request Body

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "123456"
}
```

### 📤 Success Response (201 Created)

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com"
  }
}
```

### ❌ Error Responses

🔸 400 Bad Request (Validation Error)

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email"
    }
  ]
}
```

🔸 400 Bad Request (Missing Fields)

```json
{
  "message": "All fields are required"
}
```

🔸 409 Conflict

```json
{
  "message": "User already exists"
}
```

🔸 500 Internal Server Error

```json
{
  "message": "Server error"
}
```

---

## 📌 2. Login User

### 🔗 Endpoint

POST /users/login

### 📖 Description

Authenticate user using email and password.

Checks if user exists
Compares hashed password
Returns JWT token
Sets token in cookies

---

### 📥 Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### 📤 Success Response (200 OK)

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com"
  }
}
```

### ❌ Error Responses

🔸 400 Bad Request

```json
{
  "errors": []
}
```

🔸 401 Unauthorized

```json
{
  "message": "Invalid email or password"
}
```

🔸 500 Internal Server Error

```json
{
  "message": "Server error"
}
```

---

## 📌 3. Get User Profile

### 🔗 Endpoint

GET /users/profile

🔐 Authentication Required

### 📖 Description

Returns the currently authenticated user's profile.

Uses authUser middleware
Reads user from token

---

### 📤 Success Response (200 OK)

```json
{
  "_id": "user_id",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com"
}
```

### ❌ Error Responses

🔸 401 Unauthorized

```json
{
  "message": "Unauthorized"
}
```

---

## 📌 4. Logout User

### 🔗 Endpoint

GET /users/logout

🔐 Authentication Required

### 📖 Description

Logs out the user.

Clears cookie token
Stores token in blacklist database

---

### 📤 Success Response (200 OK)

```json
{
  "message": "User Logged Out"
}
```

### ❌ Error Responses

🔸 401 Unauthorized

```json
{
  "message": "Unauthorized"
}
```

### 🔐 Authentication

Protected routes require JWT token.

### तरीका 1: Authorization Header

Authorization: Bearer <token>

### तरीका 2: Cookies

Token stored in HTTP-only cookies

### ⚙️ Validation Rules

Email must be valid
First name ≥ 3 characters
Password ≥ 6 characters

### 🔐 Security

Password hashed using bcryptjs
JWT used for authentication
Token blacklisted on logout

---
