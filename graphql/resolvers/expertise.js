const Expertise = require("../../mongoose/models/expertise");

module.exports = {
  expertises: async () => {
    try {
      const expertises = Expertise.find();
      return expertises;
    } catch (error) {
      throw error;
    }
  },
  createExpertise: async args => {
    try {
      const { title, domain } = args.expertiseInput;
      const expertise = new Expertise({
        title,
        domain
      });
      const result = await expertise.save();
      return {
        ...result._doc
      };
    } catch (error) {
      throw error;
    }
  }
};
