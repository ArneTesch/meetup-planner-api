const authResolver = require("./auth");
const meetupResolver = require("./meetup");

const rootResolver = {
  ...authResolver,
  ...meetupResolver
};

module.exports = rootResolver;
