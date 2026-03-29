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

# 🚖 Captain Registration API

## 📌 Endpoint

```
POST /captain/register
```

---

## 📖 Description

This endpoint is used to register a new captain (driver) in the system. It validates input data, checks for duplicate email, hashes the password, and creates a new captain record in the database.

---

## 🧾 Request Body

Send the following JSON data:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "123456",
  "vehicle": {
    "color": "Black",
    "plate": "HR26AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

## ✅ Validation Rules

| Field               | Rules                                  |
| ------------------- | -------------------------------------- |
| fullName.firstName  | Minimum 3 characters                   |
| email               | Must be a valid email                  |
| password            | Minimum 6 characters                   |
| vehicle.color       | Minimum 3 characters                   |
| vehicle.plate       | Minimum 3 characters                   |
| vehicle.capacity    | Integer ≥ 1                            |
| vehicle.vehicleType | Must be `car`, `motorcycle`, or `auto` |

---

## 🔄 Process Flow

1. Validate request body using `express-validator`
2. Check if captain already exists using email
3. Hash password using `bcrypt`
4. Create captain in database
5. Generate JWT token
6. Return response

---

## 🎯 Success Response

**Status Code:** `201 Created`

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "65f1c9...",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "HR26AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "active"
  }
}
```

---

## ❌ Error Responses

### 1. Validation Error

**Status Code:** `400 Bad Request`

```json
{
  "errors": [
    {
      "msg": "Firstname must be of at least 3 characters",
      "param": "fullName.firstName"
    }
  ]
}
```

---

### 2. Captain Already Exists

**Status Code:** `400 Bad Request`

```json
{
  "message": "Captain already exists"
}
```

---

## 🔐 Notes

- Password is securely hashed before storing.
- JWT token is generated for authentication.
- Password is not returned in response (`select: false` in schema).

---

## ⚠️ Important Fix (Bug in Your Code)

Replace this line in your controller:

```js
const token = captainModel.generateToken;
```

❌ Wrong — not calling function & wrong method name

✅ Correct:

```js
const token = captain.generateAuthToken();
```

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs for password hashing

---

## 📌 Author Notes

- Ensure `JWT_SECRET` is set in `.env`
- Always validate input before database operations
- Use HTTPS in production for security

---
