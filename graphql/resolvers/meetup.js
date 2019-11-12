const Meetup = require("../../mongoose/models/meetup");

module.exports = {
  meetups: async () => {
    try {
      let populatedMeetup;
      await Meetup.find()
        .populate("speakers")
        .exec()
        .then(result => {
          populatedMeetup = result;
        });
      return populatedMeetup;
    } catch (error) {
      throw error;
    }
  },
  createMeetup: async args => {
    const { title, description, date, location, speakers } = args.meetupInput;

    const newMeetup = new Meetup({
      title,
      description,
      date,
      location,
      speakers
    });

    try {
      return await newMeetup
        .save()
        .then(meetup => meetup.populate("speakers").execPopulate());
    } catch (error) {
      throw error;
    }
  }
};
