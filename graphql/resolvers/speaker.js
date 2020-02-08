const Speaker = require("../../mongoose/models/speaker");
const Expertise = require("../../mongoose/models/expertise");

module.exports = {
  speakers: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    try {
      let populatedSpeaker;
      return await Speaker.find();
      let expertise = await Expertise.find();
      console.log(expertise);
      console.log(speaker);

      // .populate("expertise")

      // .then(result => {
      //   populatedSpeaker = result;
      // });

      // return populatedSpeaker;
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
      expertise: {
        title: expertise.title,
        domain: expertise.domain
      }
    });

    try {
      return await newSpeaker.save();
    } catch (error) {
      throw ("Failed to create speaker:: ", error);
    }
  }
};
