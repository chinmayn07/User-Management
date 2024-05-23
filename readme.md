# User Management App

A simple user management application built with Node.js, Express, and MongoDB, including Docker configuration and CI/CD pipelines using GitHub Actions.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/user-management.git
   cd user-management
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App Locally

1. Create a `.env` file in the root directory and add your MongoDB URI:

   ```env
   MONGO_URI=mongodb://localhost:27017/user_management
   PORT=5000
   ```

2. Start the MongoDB server:

   ```sh
   mongod --dbpath /path/to/your/db
   ```

3. Run the application:
   ```sh
   npm start
   ```

The app will be running on `http://localhost:5000`.

### Running Tests

1. Create a `.env.test` file in the root directory and add your test MongoDB URI:

   ```env
   MONGO_URI_TEST=mongodb://localhost:27017/user_management_test
   ```

2. Run tests:
   ```sh
   npm test
   ```

## API Endpoints

The following endpoints are available:

### Create a User

- **URL:** `/api/users`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```
- **Success Response:**
  - **Code:** `201`
  - **Content:** `{ "_id": "user_id", "name": "John Doe", "email": "john.doe@example.com" }`

### Get All Users

- **URL:** `/api/users`
- **Method:** `GET`
- **Success Response:**
  - **Code:** `200`
  - **Content:** `[ { "_id": "user_id", "name": "John Doe", "email": "john.doe@example.com" }, ... ]`

### Get User by ID

- **URL:** `/api/users/:id`
- **Method:** `GET`
- **Success Response:**
  - **Code:** `200`
  - **Content:** `{ "_id": "user_id", "name": "John Doe", "email": "john.doe@example.com" }`

### Update a User

- **URL:** `/api/users/:id`
- **Method:** `PUT`
- **Body:**
  ```json
  {
    "name": "Jane Doe"
  }
  ```
- **Success Response:**
  - **Code:** `200`
  - **Content:** `{ "_id": "user_id", "name": "Jane Doe", "email": "john.doe@example.com" }`

### Delete a User

- **URL:** `/api/users/:id`
- **Method:** `DELETE`
- **Success Response:**
  - **Code:** `200`

## Docker Usage

### Build and Run

1. Build the Docker image:

   ```sh
   docker build -t user-management .
   ```

2. Run the Docker container:
   ```sh
   docker run -d -p 5000:5000 --name user-management-container user-management
   ```

The app will be running on `http://localhost:5000`.

### Docker Compose

1. Create a `docker-compose.yml` file:

   ```yaml
   version: "3.8"
   services:
     app:
       build: .
       ports:
         - "5000:5000"
       environment:
         - MONGO_URI=mongodb://mongo:27017/user_management
       depends_on:
         - mongo
     mongo:
       image: mongo
       ports:
         - "27017:27017"
   ```

2. Run Docker Compose:
   ```sh
   docker-compose up -d
   ```

## Deployment

### Deploying to AWS EC2

1. Build the Docker image:

   ```sh
   docker build -t yourusername/user-management .
   ```

2. Push the Docker image to Docker Hub:

   ```sh
   docker login
   docker push yourusername/user-management
   ```

3. SSH into your EC2 instance and pull the Docker image:

   ```sh
   ssh -i your-key.pem ec2-user@your-ec2-ip
   docker pull yourusername/user-management
   ```

4. Run the Docker container on EC2:

   ```sh
   docker run -d -p 5000:5000 --name user-management-container yourusername/user-management
   ```

5. Access the app on `http://your-ec2-ip:5000`.

### CI/CD with GitHub Actions

Ensure you have set your Docker Hub username, password, and other secrets in GitHub Actions secrets.
