// server.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {typeDefs} from './Schema.js'; // Assuming your schema is in schema.js
import resolvers from './resolver.js'; // Update with your actual resolvers file
import mysql from 'mysql2/promise'; // Using promise-based MySQL client

const app = express();

const startServer = async () => {
  try {
    // Create MySQL connection pool
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'ashok',
      password: '12345',
      database: 'Todo',
    });


  

  
    await pool.getConnection();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { pool } 
    });

    await server.start();

    server.applyMiddleware({ app });

    // Start the server
    app.listen({ port: 4000 }, () =>
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
  }
};

startServer();