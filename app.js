const express = require("express");
const bodyParser = require("body-parser");

const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphqlSchema = require("./graphql/schemas/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

const app = express();
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// run on every incoming request, we will have the req.isAuth field in every request of every resolver
app.use(isAuth);
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

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-eczxi.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listen on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
