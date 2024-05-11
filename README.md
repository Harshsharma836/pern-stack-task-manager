# PERN Stack Task Manager

This web application is built using the PERN stack (PostgreSQL, Express.js, React.js, Node.js) and integrates Prisma ORM for efficient management of tasks and user accounts.

## Features

- **User Authentication**: Users can register and login securely, with passwords hashed before storage.
- **User Management**: CRUD operations for user accounts, including viewing, adding and deleting.
- **Task Management**: CRUD operations for tasks, including viewing, adding, editing, and deleting.
- **Cloudinary Integration**: Used to store images, such as user profile photos.
- **Deployment**: Backend deployed on AWS, ensuring scalability and reliability.
- **Frontend**: Built with React.js and Bootstrap for a responsive UI.

## Running the Application Locally

1. Clone the repository.
2. Install dependencies in both the client and server directories using `npm install`.
3. Set up a PostgreSQL database and update the database connection URL in the `.env` file.
4. Run the development server using `npm run dev` in both directories.

## Docker Setup

- Use the following Docker command to run a PostgreSQL container:
  ```
  docker run --name my_postgres -e POSTGRES_PASSWORD=harsh -d -p 5432:5432 postgres
  ```
- Access the PostgreSQL shell:
  ```
  docker exec -it my_postgres bash
  psql -U postgres
  ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:
  ```
  DATABASE_URL="postgresql://postgres:harsh@localhost:5432/mydb"
  PORT=4000
  JWT_SECRET_KEY="your_secret_key_here"
  FRONTEND_URL=http://localhost:5173

  CLOUDINARY_CLIENT_NAME=
  CLOUDINARY_CLIENT_API=
  CLOUDINARY_CLIENT_SECRET=
  ```


## Images

![Screenshot (249)](https://github.com/Harshsharma836/pern-stack-task-manager/assets/70514943/2a75a4d5-fa99-4e01-8ec6-8b1bddf0c18d)

![Screenshot (254)](https://github.com/Harshsharma836/pern-stack-task-manager/assets/70514943/e1f6d12b-2f39-4c8f-9f75-a98febd12fbd)

![Screenshot (245)](https://github.com/Harshsharma836/pern-stack-task-manager/assets/70514943/e547c361-0ac2-4859-a6c5-32c4bcf71dab)

![Screenshot (246)](https://github.com/Harshsharma836/pern-stack-task-manager/assets/70514943/72796492-7399-4577-937e-8067fbe45b9a)

![Screenshot (253)](https://github.com/Harshsharma836/pern-stack-task-manager/assets/70514943/c4d6a2b7-4780-4137-aaac-6ca871c42fdf)

![Screenshot (251)](https://github.com/Harshsharma836/pern-stack-task-manager/assets/70514943/3777c57b-e5b0-4d1c-a202-cb3d2e25b365)

This application provides a simple yet effective solution for managing tasks and user accounts, demonstrating the power and versatility of the PERN stack.
