const Meetup = require("../../mongoose/models/meetup");

module.exports = {
  meetups: async () => {
    try {
      const meetups = await Meetup.find();
      return meetups;
    } catch (error) {
      throw error;
    }
  },
  createMeetup: async args => {
    const { title, description, date, location } = args.meetupInput;

    const meetup = new Meetup({
      title,
      description,
      date,
      location
    });

    try {
      const result = await meetup.save();
      return {
        ...result._doc
      };
    } catch (error) {
      throw error;
    }
  }
};
