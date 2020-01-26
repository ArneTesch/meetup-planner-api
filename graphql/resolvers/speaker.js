const Speaker = require("../../mongoose/models/speaker");

module.exports = {
  speakers: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      let populatedSpeaker;
      await Speaker.find()
        .populate("expertise")
        .exec()
        .then(result => {
          populatedSpeaker = result;
        });

      return populatedSpeaker;
    } catch (error) {
      throw new Error("Failed to fetch speakers:: ", error);
    }
  },
  createSpeaker: async args => {
    const { name, age, nationality, avatar, expertise } = args.speakerInput;

    const newSpeaker = new Speaker({
      name,
      age,
      nationality,
      avatar,
      expertise
    });

    try {
      return await newSpeaker
        .save()
        .then(speaker => speaker.populate("expertise").execPopulate());
    } catch (error) {
      throw ("Failed to create speaker:: ", error);
    }
  }
};
