# User Registration Endpoint Documentation

## POST `/users/register`

Registers a new user in the system.

### Request Body

Send a JSON object with the following fields:

| Field      | Type     | Required | Description           |
|------------|----------|----------|-----------------------|
| fullname   | object   | Yes      | Full name of the user |
| └─ firstname | string | Yes      | User's first name (min 3 chars) |
| └─ lastname  | string | No       | User's last name (min 3 chars)  |
| email      | string   | Yes      | User's email address  |
| password   | string   | Yes      | User's password (min 6 chars)   |

**Example:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "yourpassword"
}
```

### Responses

| Status Code | Description                        |
|-------------|------------------------------------|
| 201         | User registered successfully       |
| 400         | Missing or invalid input data      |
| 409         | Email already exists               |
| 500         | Internal server error              |

### Example Success Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "60c72b2f9b1e8e001c8e4b8a",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com"
  }
}
```

### Example Error Response

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

# User Login Endpoint Documentation

## POST `/users/login`

Authenticates a user and returns a JWT token.

### Request Body

Send a JSON object with the following fields:

| Field    | Type   | Required | Description                |
|----------|--------|----------|----------------------------|
| email    | string | Yes      | User's email address       |
| password | string | Yes      | User's password (min 6 chars) |

**Example:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

### Responses

| Status Code | Description                        |
|-------------|------------------------------------|
| 200         | Login successful, token returned   |
| 400         | Missing or invalid input data      |
| 401         | Invalid email or password          |
| 500         | Internal server error              |

### Example Success Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "60c72b2f9b1e8e001c8e4b8a",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com"
  }
}
```

### Example Error Response

```json
{
  "message": "Invalid email or password"
}
```

---

# User Profile Endpoint Documentation

## GET `/users/profile`

Returns the profile information of the currently authenticated user. Requires a valid JWT token in the `Authorization` header or as a cookie.

### Headers

- `Authorization: Bearer <token>` (or send token as a cookie named `token`)

### Responses

| Status Code | Description                        |
|-------------|------------------------------------|
| 200         | Returns user profile               |
| 401         | Unauthorized or invalid token      |

### Example Success Response

```json
{
  "user": {
    "_id": "60c72b2f9b1e8e001c8e4b8a",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com"
  }
}
```

### Example Error Response

```json
{
  "message": "Unauthorized"
}
```

---

# User Logout Endpoint Documentation

## GET `/users/logout`

Logs out the currently authenticated user by blacklisting the JWT token and clearing the authentication cookie.

### Headers

- `Authorization: Bearer <token>` (or send token as a cookie named `token`)

### Responses

| Status Code | Description                        |
|-------------|------------------------------------|
| 200         | Logged out successfully            |
| 401         | Unauthorized or invalid token      |

### Example Success Response

```json
{
  "message": "Logged out successfully"
}
```

### Example Error Response

```json
{
  "message": "Unauthorized"
}
```

---

# Captain Registration Endpoint Documentation

## POST `/captains/register`

Registers a new captain (driver) in the system.

### Request Body

Send a JSON object with the following fields:

| Field      | Type     | Required | Description                       |
|------------|----------|----------|-----------------------------------|
| fullname   | object   | Yes      | Full name of the captain          |
| └─ firstname | string | Yes      | Captain's first name (min 3 chars)|
| └─ lastname  | string | Yes      | Captain's last name (min 3 chars) |
| email      | string   | Yes      | Captain's email address           |
| password   | string   | Yes      | Captain's password (min 6 chars)  |
| vehicle    | object   | Yes      | Vehicle details                   |
| └─ color   | string   | Yes      | Vehicle color (min 3 chars)       |
| └─ plate   | string   | Yes      | Vehicle plate (min 3 chars)       |
| └─ capacity| number   | Yes      | Vehicle capacity (min 1)          |
| └─ vehicleType | string | Yes    | Type of vehicle: 'bike', 'car', or 'auto' |

**Example:**
```json
{
  "fullname": {
    "firstname": "Amit",
    "lastname": "Sharma"
  },
  "email": "amit.captain@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "DL01AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses

| Status Code | Description                        |
|-------------|------------------------------------|
| 201         | Captain registered successfully    |
| 400         | Missing or invalid input data      |
| 409         | Captain (email) already exists     |
| 500         | Internal server error              |

### Example Success Response

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "60c72b2f9b1e8e001c8e4b8b",
    "fullname": {
      "firstname": "Amit",
      "lastname": "Sharma"
    },
    "email": "amit.captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "DL01AB1234",
      "capacity": 4
    },
    "vehicleType": "car",
    "status": "inactive"
  }
}
```

### Example Error Response

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```
or
```json
{
  "message": "Captain already exists"
}
```

---


