# School Management API

This project is a Node.js REST API for managing school data. It allows users to add new schools and retrieve a list of schools sorted by proximity to a specified location.

## Features

- Add a new school with name, address, latitude, and longitude.
- List all schools sorted by distance from the user's given coordinates.

## Tech Stack

- Node.js
- Express.js
- MySQL (using mysql2 with Promise support)
- dotenv for environment variable management

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/sathwika16/school-api.git
   cd school-api
Install dependencies

bash
Copy
Edit
npm install
Configure environment variables

Create a .env file in the root directory and add:

ini
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_db
PORT=3000
Setup MySQL database

Create the database and table by running SQL commands:

sql
Copy
Edit
CREATE DATABASE IF NOT EXISTS school_db;

USE school_db;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
Run the application

bash
Copy
Edit
node app.js
Test APIs

Use Postman or any API client to test:

POST /api/addSchool — Add a school

GET /api/listSchools?latitude=...&longitude=... — List schools by proximity

API Endpoints
Add School
URL: /api/addSchool

Method: POST

Body:

json
Copy
Edit
{
  "name": "ABC School",
  "address": "123 Street, City",
  "latitude": 12.34567,
  "longitude": 76.54321
}
Success Response:

json
Copy
Edit
{
  "message": "School added",
  "id": 1
}
List Schools
URL: /api/listSchools

Method: GET

Query Parameters:

latitude — User's latitude

longitude — User's longitude

Success Response:

json
Copy
Edit
[
  {
    "id": 1,
    "name": "ABC School",
    "address": "123 Street, City",
    "latitude": 12.34567,
    "longitude": 76.54321,
    "distance": 0.5
  },
  ...
]
Author
Sathwika
