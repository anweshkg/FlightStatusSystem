# Flight Status System Backend

This is the backend application for the Flight Status System. It's built with NestJS and provides APIs for managing flights, user authentication, and flight subscriptions.

## Features

- User authentication and authorization
- Role-based access control (RBAC)
- Flight information management
- Flight subscription system
- Flight delay updates

 - update delay api with RBAC and JWT decorators:
![2](../readme_images/9.png)

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL (or your chosen database)

## Setup

1. Clone the repository and navigate to the backend folder:

   ```bash
   git clone <repository-url>
   cd <repository-name>/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root of the backend folder and add the following environment variables:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/flight_status
   JWT_SECRET=your_jwt_secret_key
   ```

   Adjust the `DATABASE_URL` according to your database configuration.

4. Run database migrations:

   ```bash
   npm run migration:run
   # or
   yarn migration:run
   ```

5. Start the development server:

   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```

The server will start on `http://localhost:3001` by default.

## Project Structure

- `src/`
  - `auth/`: Authentication-related modules and services
  - `flights/`: Flight-related modules and services
  - `users/`: User management modules and services
  - `app.module.ts`: Main application module
  - `main.ts`: Application entry point

## Available Scripts

- `npm run start`: Starts the application
- `npm run start:dev`: Starts the application in watch mode
- `npm run build`: Builds the application
- `npm run test`: Runs unit tests
- `npm run test:e2e`: Runs end-to-end tests
- `npm run migration:generate`: Generates a new migration
- `npm run migration:run`: Runs pending migrations
