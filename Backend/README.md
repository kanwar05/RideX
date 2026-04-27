# 🚖 Uber Clone - Frontend API Documentation

## 📋 Overview

This is the frontend application for the Uber Clone project built with React + Vite. This document provides comprehensive API endpoint documentation for all backend services used by the frontend.

**Base URL:** `http://localhost:4000`

---

## 🔐 Authentication

Most API endpoints require JWT authentication. The token should be sent in the request headers:

```
Authorization: Bearer <token>
```

Tokens are received upon successful login/registration and should be stored in `localStorage` with the key `token`.

---

# 👤 USER ENDPOINTS

## 1. Register User

**Method:** `POST`  
**Endpoint:** `/users/register`  
**Authentication:** ❌ Not required

### Request Body

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

### Validation Rules

- `email`: Valid email format required
- `firstName`: Minimum 3 characters
- `password`: Minimum 6 characters

### Success Response (201)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "60d5ec49f1b2c7a4e8c3d2a1",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com"
  }
}
```

### Error Responses

- **400**: Validation error or missing fields
- **409**: User already exists

---

## 2. Login User

**Method:** `POST`  
**Endpoint:** `/users/login`  
**Authentication:** ❌ Not required

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Validation Rules

- `email`: Valid email format required
- `password`: Minimum 6 characters

### Success Response (200)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "60d5ec49f1b2c7a4e8c3d2a1",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com"
  }
}
```

### Error Responses

- **400**: Invalid email or password
- **401**: User not found

---

## 3. Get User Profile

**Method:** `GET`  
**Endpoint:** `/users/profile`  
**Authentication:** ✅ Required

### Headers

```
Authorization: Bearer <token>
```

### Success Response (200)

```json
{
  "_id": "60d5ec49f1b2c7a4e8c3d2a1",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "socketId": "socket_id_123"
}
```

### Error Responses

- **401**: Unauthorized (invalid or missing token)

---

## 4. Logout User

**Method:** `GET`  
**Endpoint:** `/users/logout`  
**Authentication:** ❌ Not required

### Success Response (200)

```json
{
  "message": "Logged out successfully"
}
```

---

# 🚗 CAPTAIN ENDPOINTS

## 1. Register Captain

**Method:** `POST`  
**Endpoint:** `/captains/register`  
**Authentication:** ❌ Not required

### Request Body

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "email": "jane@example.com",
  "password": "123456",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Validation Rules

- `firstName`: Minimum 3 characters
- `email`: Valid email format
- `password`: Minimum 6 characters
- `vehicle.color`: Minimum 3 characters
- `vehicle.plate`: Minimum 3 characters
- `vehicle.capacity`: Minimum 1
- `vehicle.vehicleType`: Minimum 3 characters

### Success Response (201)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "captain": {
    "_id": "60d5ec49f1b2c7a4e8c3d2a2",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Responses

- **400**: Validation error
- **409**: Captain already exists

---

## 2. Login Captain

**Method:** `POST`  
**Endpoint:** `/captains/login`  
**Authentication:** ❌ Not required

### Request Body

```json
{
  "email": "jane@example.com",
  "password": "123456"
}
```

### Validation Rules

- `email`: Valid email format
- `password`: Minimum 6 characters

### Success Response (200)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "captain": {
    "_id": "60d5ec49f1b2c7a4e8c3d2a2",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Responses

- **400**: Invalid credentials
- **401**: Captain not found

---

## 3. Get Captain Profile

**Method:** `GET`  
**Endpoint:** `/captains/profile`  
**Authentication:** ✅ Required

### Headers

```
Authorization: Bearer <token>
```

### Success Response (200)

```json
{
  "_id": "60d5ec49f1b2c7a4e8c3d2a2",
  "fullName": {
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "email": "jane@example.com",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "socketId": "socket_id_456"
}
```

### Error Responses

- **401**: Unauthorized

---

## 4. Logout Captain

**Method:** `GET`  
**Endpoint:** `/captains/logout`  
**Authentication:** ✅ Required

### Headers

```
Authorization: Bearer <token>
```

### Success Response (200)

```json
{
  "message": "Logged out successfully"
}
```

### Error Responses

- **401**: Unauthorized

---

# 🛣️ RIDE ENDPOINTS

## 1. Create Ride

**Method:** `POST`  
**Endpoint:** `/rides/create-ride`  
**Authentication:** ✅ Required

### Headers

```
Authorization: Bearer <token>
```

### Request Body

```json
{
  "pickUp": "123 Main Street, City",
  "destination": "456 Oak Avenue, City",
  "vehicleType": "car"
}
```

### Validation Rules

- `pickUp`: Minimum 3 characters
- `destination`: Minimum 3 characters
- `vehicleType`: Must be one of `car`, `auto`, or `moto`

### Success Response (201)

```json
{
  "_id": "60d5ec49f1b2c7a4e8c3d2a3",
  "user": "60d5ec49f1b2c7a4e8c3d2a1",
  "pickUp": "123 Main Street, City",
  "destination": "456 Oak Avenue, City",
  "vehicleType": "car",
  "status": "pending",
  "fare": 150,
  "createdAt": "2024-04-27T10:30:00Z"
}
```

### Error Responses

- **400**: Validation error
- **401**: Unauthorized

---

## 2. Get Fare

**Method:** `GET`  
**Endpoint:** `/rides/get-fare`  
**Authentication:** ✅ Required

### Headers

```
Authorization: Bearer <token>
```

### Query Parameters

```
?pickUp=123 Main Street&destination=456 Oak Avenue
```

### Validation Rules

- `pickUp`: Minimum 3 characters
- `destination`: Minimum 3 characters

### Success Response (200)

```json
{
  "fare": {
    "car": 150,
    "auto": 100,
    "moto": 75
  },
  "distance": 5.2,
  "time": 15
}
```

### Error Responses

- **400**: Validation error
- **401**: Unauthorized
- **404**: Unable to calculate fare

---

# 🗺️ MAPS ENDPOINTS

## 1. Get Coordinates

**Method:** `GET`  
**Endpoint:** `/maps/get-coordinates`  
**Authentication:** ✅ Required

### Headers

```
Authorization: Bearer <token>
```

### Query Parameters

```
?address=123 Main Street, City
```

### Validation Rules

- `address`: Minimum 3 characters, must be a string

### Success Response (200)

```json
{
  "latitude": 40.7128,
  "longitude": -74.006,
  "address": "123 Main Street, City"
}
```

### Error Responses

- **400**: Validation error
- **401**: Unauthorized
- **404**: Coordinates not found

---

## 2. Get Distance and Time

**Method:** `GET`  
**Endpoint:** `/maps/get-distance-time`  
**Authentication:** ✅ Required

### Headers

```
Authorization: Bearer <token>
```

### Query Parameters

```
?origin=123 Main Street&destination=456 Oak Avenue
```

### Validation Rules

- `origin`: Minimum 3 characters
- `destination`: Minimum 3 characters

### Success Response (200)

```json
{
  "distance": {
    "text": "5.2 km",
    "value": 5200
  },
  "duration": {
    "text": "15 mins",
    "value": 900
  }
}
```

### Error Responses

- **400**: Validation error
- **401**: Unauthorized
- **404**: Distance and time not found

---

## 3. Get Autocomplete Suggestions

**Method:** `GET`  
**Endpoint:** `/maps/get-autocomplete-suggestions`  
**Authentication:** ✅ Required

### Headers

```
Authorization: Bearer <token>
```

### Query Parameters

```
?input=123 Main
```

### Validation Rules

- `input`: Minimum 3 characters, must be a string

### Success Response (200)

```json
{
  "suggestions": [
    "123 Main Street, City, State",
    "123 Main Avenue, City, State",
    "123 Main Boulevard, City, State"
  ]
}
```

### Error Responses

- **400**: Validation error
- **401**: Unauthorized
- **404**: Autocomplete suggestions not found

---

## 📌 Common HTTP Status Codes

| Code | Meaning                                          |
| ---- | ------------------------------------------------ |
| 200  | OK - Request successful                          |
| 201  | Created - Resource created successfully          |
| 400  | Bad Request - Invalid input or validation error  |
| 401  | Unauthorized - Missing or invalid authentication |
| 409  | Conflict - Resource already exists               |
| 500  | Internal Server Error                            |

---

## 🛠️ Development Setup

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
npm install
```

### Running the Frontend

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

---

## 📦 Dependencies

- **React**: UI library
- **Vite**: Build tool
- **Axios**: HTTP client for API calls
- **GSAP**: Animation library
- **Tailwind CSS**: Utility-first CSS framework
- **React Context**: State management

---

## 🤝 Contributing

Please follow the existing code style and structure when contributing to this project.

---

## 📄 License

This project is part of the Uber Clone tutorial series.
