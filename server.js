const express = require('express');
const express_graphql = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');

connectDB();

// Create an express server and a Graphql endpoint
const app = express();
app.use('/graphql',express_graphql({
    schema:schema,
    graphiql:true
}));

app.listen(4000, () => console.log('Express Graphql Server now running on localhost:4000/graphql'));