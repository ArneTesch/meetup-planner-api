const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const speakerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  expertise: {
    type: Schema.Types.ObjectId,
    ref: "Expertise"
  },
  meetups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meetup"
    }
  ]
});

module.exports = mongoose.model("Speaker", speakerSchema);
