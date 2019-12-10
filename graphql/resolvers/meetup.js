const Meetup = require("../../mongoose/models/meetup");

module.exports = {
  meetups: async (args, req) => {
    // console.log(req);

    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    try {
      let populatedMeetup;
      await Meetup.find()
        .populate({ path: "speakers", populate: { path: "expertise" } })
        .populate("visitors")
        .exec()
        .then(result => {
          populatedMeetup = result;
        });
      return populatedMeetup;
    } catch (error) {
      throw error;
    }
  },
  createMeetup: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

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
  },
  bookMeetup: async (args, req) => {
    const { meetupId } = args;
    // check if meetup already contains visitorId in array
    // update visitor document >> meetups[meetupId]
    // const visitorId = req.visitorId
    return await Meetup.findByIdAndUpdate(
      meetupId,
      { $push: { visitors: "5dcc29af8ad54033ea0b9221" } },
      { safe: true }
    ).catch(err => {
      throw new Error(err);
    });
  },
  deleteMeetup: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const meetup = await Meetup.findById(args.meetupId);
      await Meetup.deleteOne({ _id: args.meetupId });
      return meetup;
    } catch (error) {
      throw error;
    }
  },
  updateMeetup: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    try {
      let updateValue = {};
      const {
        _id,
        title,
        description,
        date,
        location,
        speakers
      } = args.updateMeetupInput;

      if (title) updateValue.title = title;
      if (description) updateValue.description = description;
      if (date) updateValue.date = date;
      if (location) updateValue.location = location;
      if (speakers) updateValue.speakers = speakers;
      const meetup = await Meetup.findOneAndUpdate({ _id: _id }, updateValue, {
        new: true
      })
        .populate("speakers")
        .exec();
      return meetup;
    } catch (error) {}
  }
};
