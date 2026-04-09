# School Management API

A simple API built using **Node.js, Express, and MySQL** to manage school data.

## Features
- Add a new school
- Get a list of schools sorted by distance from a given location

## Setup

1. Clone the repository
git clone <repo-link>

2. Install dependencies
npm install

3. Create a `.env` file

DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=yourpassword  
DB_NAME=schooldb  

4. Start the server
node server.js

Server runs on:
http://localhost:3000

## Database

Create a database called `schooldb` and run:

CREATE TABLE schools (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
address VARCHAR(255),
latitude FLOAT,
longitude FLOAT
);

## API Endpoints

## Add School
POST /addSchool

Example body:
{
"name": "DPS",
"address": "Delhi",
"latitude": 28.7041,
"longitude": 77.1025
}

## List Schools
GET /listSchools?latitude=28.7041&longitude=77.1025

Returns schools sorted by distance.

## Testing
A Postman collection is included to test the APIs.
