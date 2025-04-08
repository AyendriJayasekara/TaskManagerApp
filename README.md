# Task Manager Application

A full-stack task management application built with Spring Boot (Backend) and Angular (Frontend).

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven
- npm or yarn
- Angular CLI

## Project Structure

```
Project-TaskManagerApp/
├── Backend/           # Spring Boot application
│   └── TaskManager/
└── Frontend/          # Angular application
    └── TaskManager-FE/
```

## Database Setup

1. Install MySQL if not already installed
2. Create a new database named `taskmanagerapp` (or it will be created automatically)
3. Update database credentials in `Backend/TaskManager/src/main/resources/application.properties` if needed:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

## Backend Setup and Running

1. Navigate to the backend directory:

   ```bash
   cd Backend/TaskManager
   ```

2. Build the project using Maven:

   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend server will start on `http://localhost:8080`

## Frontend Setup and Running

1. Navigate to the frontend directory:

   ```bash
   cd Frontend/TaskManager-FE
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   ng serve
   # or
   npm start
   ```

The frontend application will start on `http://localhost:4200`

## Features

- Task creation, view , update, and deletion
- Task categorization and filtering
- User profile management

## API Documentation

Once the backend is running, you can access the API documentation at:
`http://localhost:8080/swagger-ui.html`

## Troubleshooting

1. If you encounter database connection issues:

   - Verify MySQL service is running
   - Check database credentials in application.properties
   - Ensure the database exists and is accessible

2. If frontend fails to connect to backend:
   - Verify both services are running
   - Check CORS configuration if needed
   - Ensure correct API endpoints in frontend configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Screenshot of the Task Manager App![Screenshot (805)](https://github.com/user-att![Screenshot (811)](https://github.com/user-attachments/assets/b74e913a-921b-400a-915c-fa94f88c4cd6)
![Screenshot (810)](https://github.com/user-attachments/assets/e4510878-da06-4c1f-8803-ca53819f1992)
![Screenshot (809)](https://github.com/user-attachments/assets/6627cf7b-7ef3-4b8e-a667-d0f1a80da2a5)
![Screenshot (808)](https://github.com/user-attachments/assets/07f1e757-eec7-4751-a77f-de51214454c6)
![Screenshot (807)](https://github.com/user-attachments/assets/7106a1cd-324c-4b72-aba5-78d3108b286e)
![Screenshot (806)](https://github.com/user-attachments/assets/ca0d50af-294f-4c36-ae5f-f20504f88d8c)
achments/assets/4cf6d9fe-a9dc-410b-a4a6-f3cb3bf3e03e)
