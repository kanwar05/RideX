# 👤 User Profile & Logout API Documentation

---

## 📌 Endpoint: Get User Profile

### 🔗 URL

http://localhost:4000/users/profile

### 📤 Method

GET /users/profile

---

## 📖 Description

This endpoint is used to **get the authenticated user's profile data**.

It requires a valid **JWT token**. The token is verified using the `authUser` middleware.

---

## 🔐 Authentication

- Token must be sent in:
  - **Cookies** OR
  - **Authorization Header**

### Example Header:

Authorization: Bearer <your_token>

---

## 📤 Success Response

### ✅ 200 OK

````json
{
  "_id": "user_id",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com"
}
❌ Error Responses
🔸 401 Unauthorized
{
  "message": "Unauthorized"
}
🔸 500 Internal Server Error
{
  "message": "Server error"
}

🚀 Example Request (cURL)
curl -X GET http://localhost:4000/users/profile \
-H "Authorization: Bearer <your_token>"
````

---
## 🚪 Logout User API
📌 Endpoint: Logout User
### 🔗 URL

http://localhost:4000/users/logout

### 📤 Method

GET /users/logout

## 📖 Description

This endpoint is used to logout the authenticated user.

Clears the authentication token from cookies
Adds the token to a blacklist to prevent reuse
🔐 Authentication
Requires a valid JWT token
Token can be sent via:
Cookies
Authorization header
📤 Success Response
✅ 200 OK
{
  "message": "User Logged Out"
}
❌ Error Responses
🔸 401 Unauthorized
{
  "message": "Unauthorized"
}
🔸 500 Internal Server Error
{
  "message": "Server error"
}
🚀 Example Request (cURL)
curl -X GET http://localhost:4000/users/logout \
-H "Authorization: Bearer <your_token>"
🔐 Security Notes
JWT token is invalidated by storing it in a blacklist database
Prevents reuse of old tokens after logout
Always send token securely (HTTP-only cookies recommended)

---

🔥 Now your backend has **complete API docs for:**
- ✅ Register
- ✅ Login
- ✅ Profile
- ✅ Logout

---

If you want next level 🚀:
- Combine all into **one professional README**
- Add **middleware docs (auth flow diagram)**
- Convert into **Swagger UI (real industry standard)**
ok

Great 👍 Let’s upgrade your docs into a single professional README.md (industry-level) that includes all endpoints + clean structure.

👉 Just copy everything below and replace your backend/README.md with this:

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
Register a new user by providing name, email, and password.

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
📤 Success Response (201)
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
❌ Errors
400 → Validation error
409 → User already exists
500 → Server error
📌 2. Login User
🔗 Endpoint

POST /users/login

📖 Description

Authenticate user and return JWT token.

📥 Request Body
{
  "email": "john@example.com",
  "password": "123456"
}
📤 Success Response (200)
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
❌ Errors
400 → Validation error
401 → Invalid credentials
500 → Server error
📌 3. Get User Profile
🔗 Endpoint

GET /users/profile

🔐 Authentication Required
📖 Description

Returns the currently logged-in user's profile.

📤 Success Response (200)
{
  "_id": "user_id",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com"
}
❌ Errors
401 → Unauthorized
500 → Server error
📌 4. Logout User
🔗 Endpoint

GET /users/logout

🔐 Authentication Required
📖 Description

Logs out user by clearing token and blacklisting it.

📤 Success Response (200)
{
  "message": "User Logged Out"
}
❌ Errors
401 → Unauthorized
500 → Server error
🔐 Authentication

Protected routes require a JWT token.

तरीका 1: Authorization Header
Authorization: Bearer <token>
तरीका 2: Cookies
Token stored in HTTP-only cookies
⚙️ Validation Rules
Email must be valid
First name ≥ 3 characters
Password ≥ 6 characters
🔐 Security
Passwords are hashed using bcrypt
JWT used for authentication
Tokens are blacklisted on logout
````
