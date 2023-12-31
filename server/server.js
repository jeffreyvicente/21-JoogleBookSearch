const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// Import the ApolloServer class
const {ApolloServer} = require ('apollo-server-express')

const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const app = express();
const PORT = process.env.PORT || 3001;

// Created a new instance of ApollServer named server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Orginal function
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

/*
Removed non ApolloServer Code
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
*/

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};


// Non Apollo Code
/*
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
*/

// Starts the async function to start the server
startApolloServer();


