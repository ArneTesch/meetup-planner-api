const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  speakers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Speaker"
    }
  ]
});

module.exports = mongoose.model("Meetup", meetupSchema);
