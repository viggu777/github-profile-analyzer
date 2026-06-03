# GitHub Profile Analyzer API

## About the Project

This project is a backend application built using Node.js, Express.js, and MySQL. It fetches public GitHub profile information using the GitHub API, analyzes the data, and stores useful insights in a MySQL database.

The idea behind this project was not just to save GitHub profile data, but also to generate meaningful analytics such as profile completeness, popularity score, account age, skill categorization based on profile bio, and follower-to-following ratio.

## Features

- Fetch GitHub user data using GitHub Public API
- Store analyzed profile information in MySQL
- Prevent duplicate profile analysis
- Retrieve all analyzed profiles
- Retrieve a specific profile by username
- Search profiles by location
- Search profiles by company
- Search profiles using bio keywords
- Pagination and sorting support
- View top followed profiles
- Analytics and statistics endpoints

## Insights Generated

For every analyzed profile, the application calculates:

- Account Age
- Popularity Score
- Profile Completeness Percentage
- Skill Category (MERN, Python, Java, AI/ML, Frontend, Backend, etc.)
- Follower to Following Ratio

## Tech Stack

- Node.js
- Express.js
- MySQL
- Axios (used to fetch GitHub profile data from the GitHub REST API)
- GitHub REST API

## Project Structure

config/ - Database configuration

controllers/ - Request handling logic

routes/ - API routes

services/ - GitHub API integration

schema.sql - Database schema

## API Endpoints

POST /api/github/analyze

Analyze and store a GitHub profile.

GET /api/github/profiles

Fetch all stored profiles.

GET /api/github/profiles/:username

Fetch a specific profile.

GET /api/github/location/:location

Search profiles by location.

GET /api/github/company/:company

Search profiles by company.

GET /api/github/bio/:keyword

Search profiles using bio keywords.

GET /api/github/top-followers

Get the top followed profiles.

GET /api/github/stats

Get overall statistics.

GET /api/github/analytics

Get analytics grouped by locations, companies, and skill categories.

## Setup Instructions

1. Clone the repository

git clone <repository-url>

2. Install dependencies

npm install

3. Create a .env file

PORT=5000

DB_HOST=localhost

DB_PORT=3306

DB_USER=your_user

DB_PASSWORD=your_password

DB_NAME=github_analyzer

4. Start the server

node app.js

## Future Improvements

- Repository-level analysis
- Programming language analytics
- GitHub organization analytics
- Dashboard frontend for visualizing insights

## Author

Mohan Vignesh
