# 👤 User API Documentation

## 📌 Endpoint: Register User

### 🔗 URL

http://localhost:4000/users/register

### 📤 Method

POST /users/register

---

## 📖 Description

This endpoint is used to **register a new user** in the system.

It validates the input using `express-validator`, hashes the password, stores the user in MongoDB, and returns an authentication token along with user details.

---

## 📥 Request Body

The request must be sent in **JSON format**:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "123456"
}

| Field              | Type   | Required | Description           |
| ------------------ | ------ | -------- | --------------------- |
| fullName.firstName | String | Yes      | Minimum 3 characters  |
| fullName.lastName  | String | Yes      | Minimum 3 characters  |
| email              | String | Yes      | Must be a valid email |
| password           | String | Yes      | Minimum 6 characters  |

📤 Success Response
✅ 201 Created

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

❌ Error Responses
🔸 400 Bad Request (Validation Error)

{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email"
    }
  ]
}


🔸 400 Bad Request (Missing Fields)
{
  "message": "All fields are required"
}
🔸 409 Conflict (User Already Exists)
{
  "message": "User already exists"
}
🔸 500 Internal Server Error
{
  "message": "Server error"
}


🔐 Security Notes
Password is hashed using bcryptjs before saving
Password field is not returned (select: false)
JWT token is generated after successful registration

🚀 Example Request (cURL)

curl -X POST http://localhost:4000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "123456"
}'
```

# 🔐 User Login API Documentation

## 📌 Endpoint: Login User

### 🔗 URL

http://localhost:4000/users/login

### 📤 Method

POST /users/login

---

## 📖 Description

This endpoint is used to **authenticate an existing user**.

It verifies the user's email and password, and if valid, returns a **JWT authentication token** along with user details.

---

## 📥 Request Body

The request must be sent in **JSON format**:

```json
{
  "email": "john@example.com",
  "password": "123456"
}

🧾 Field Requirements
| Field    | Type   | Required | Description           |
| -------- | ------ | -------- | --------------------- |
| email    | String | Yes      | Must be a valid email |
| password | String | Yes      | Minimum 6 characters  |

📤 Success Response
✅ 200 OK
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


❌ Error Responses
🔸 400 Bad Request (Validation Error)
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email"
    }
  ]
}


🔸 401 Unauthorized (Invalid Credentials)
{
  "message": "Invalid email or password"
}


🔸 404 Not Found (User Not Found)
{
  "message": "User not found"
}


🔸 500 Internal Server Error
{
  "message": "Server error"
}


🔐 Authentication Flow
User sends email & password
Server checks if user exists
Password is compared using bcryptjs
If valid → JWT token is generated
Token is returned to client


🚀 Example Request (cURL)
curl -X POST http://localhost:4000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john@example.com",
  "password": "123456"
}'
```
