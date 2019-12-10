const authResolver = require("./auth");
const meetupResolver = require("./meetup");
const speakerResolver = require("./speaker");
const expertiseResolver = require("./expertise");
const visitorResolver = require("./visitor");
const userResolver = require("./user");

const rootResolver = {
  ...authResolver,
  ...meetupResolver,
  ...speakerResolver,
  ...expertiseResolver,
  ...visitorResolver,
  ...userResolver
};

module.exports = rootResolver;
