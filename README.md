# Library App
This is a small Library app built with Node.js (Express) and TypeScript. The app provides APIs for user registration and login, as well as book management with role-based authorization. It also includes additional features such as filtering books based on creation time and logging API requests.

## Deployed link - 
```
https://rose-adder-yoke.cyclic.app/
```

## Features
- User registration and login
- Role-based authorization
- JWT authentication
- Book creation and retrieval
- Filtering books based on creation time
- Logging API requests

## Getting Started
1. Clone the repository:
```
https://github.com/Dheeraj-pal/Library_App_NodeJS.git
```

2. Install the dependencies:
```
cd library-app
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory of the project and add the following variables:

```
PORT=9000
MONGODB_URI=mongodb+srv://dheerajpal:dheerajpal@cluster0.lzhy20p.mongodb.net/LibraryApp?retryWrites=true&w=majority
JWT_SECRET=*/56*3rv$j@sd/*
```
4. Start the app:
```
npm run server
```
The app should now be running on `http://localhost:9000`

## API Endpoints

### User Registration

- Endpoint: `POST /users/signup`
- Description: Register a new user.
- Request body:
    - name (string, required): User's name
    - email (string, required): User's email address.
    - password (string, required): User's password.
    - roles (array, optional, default: "VIEWER" ): User's roles.
Example:
```
POST /users/signup
Content-Type: application/json

{
  "name": "User 1"
  "email": "user1@example.com",
  "password": "password123",
  "roles": ["CREATOR"]
}
```

### User Login

- Endpoint: `POST /users/login`
- Description: Log in a user and obtain an access token.
- Request body:
    - email (string, required): User's email address.
    - password (string, required): User's password.
Example:
```
POST /users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Create Book

- Endpoint: `POST /books`
- Description: Create a new book (requires "CREATOR" role).
- Request body:
     - title (string, required): Book title.
     - author (string, required): Book author.
     - creatorID (objectId, required): Book author's UserID
     - createdAt (Date): automatically added when new book is created
Example:
```
POST /books
Content-Type: application/json
authorization: bearer <access-token>

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic novel depicting the Jazz Age in America."
}
```

### Get Books

- Endpoint: GET /books
- Description: Get books based on the user's role.
- Query parameters:
     - old (number, optional): Include books created 10 minutes ago and earlier.
     - new (number, optional): Include books created within the last 10 minutes.
#### 1.  If the role is `VIEWER` or `CREATOR`:
Example:
```
GET /books?old=1
Authorization: Bearer <access-token>
```

```
GET /books?new=1
Authorization: Bearer <access-token>
```

#### 2. If the role is `VIEWALL`:

Can view all the books present in the database
Example:
```
GET /books?
Authorization: Bearer <access-token>
```

## Logging
The app logs API requests using Winston. The log files can be found in the logs directory. Each log entry contains the following information:

- level: Log level (e.g., info, error).
- message: Log message containing IP, method, path, status, and timestamp.
- timestamp: Timestamp of the log entry.
Example log entry:
```
{"level":"info","message":"IP - ::ffff:127.0.0.1, METHOD - GET, PATH - /books, STATUS - 200","timestamp":"2023-07-07T09:15:43.510Z"}
```
