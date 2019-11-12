const authResolver = require("./auth");
const meetupResolver = require("./meetup");
const speakerResolver = require("./speaker");
const expertiseResolver = require("./expertise");

const rootResolver = {
  ...authResolver,
  ...meetupResolver,
  ...speakerResolver,
  ...expertiseResolver
};

module.exports = rootResolver;
