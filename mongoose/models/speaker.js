const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const expertiseSchema = require("./expertise").schema;

const expertiseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  }
});

const speakerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Date,
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
    type: expertiseSchema,
    required: true
  },
  meetups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meetup"
    }
  ]
});

module.exports = mongoose.model("Speaker", speakerSchema);
