import { PrismaClient } from '@prisma/client';

const dbConnection = new PrismaClient();

dbConnection.$connect()
  .then(() => {
    console.log('db is connected');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit the process if unable to connect
  });

export default dbConnection;
