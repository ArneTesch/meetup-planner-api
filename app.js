const express = require("express");
const bodyParser = require("body-parser");

const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphqlSchema = require("./graphql/schemas/index");
const graphqlResolvers = require("./graphql/resolvers/index");

const app = express();
app.use(bodyParser.json());

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-eczxi.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

app.get("/", (req, res) => {
  res.send("Hello Meetup Planning");
});

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listen on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.err(err);
  });
