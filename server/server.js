const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// Import the ApolloServer class
const {ApollServer} = require ('apollo-server-express')

const app = express();
const PORT = process.env.PORT || 3001;

// Created a new instance of ApollServer named server
const server = new ApollServer({
  typeDefs,
  resolvers
});

// Orginal function
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*
Removed non ApolloServer Code
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
*/

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({app});

  db.once ('open', () => {
    app.listen(PORT, () => {
      console.log(`API server is currently running on ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphlPath}`);
    })
  })
};

// Non Apollo Code
/*
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
*/

// Starts the async function to start the server
startApollpoServer();

