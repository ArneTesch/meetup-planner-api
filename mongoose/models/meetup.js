const mongoose = require("mongoose");
const Schema = mongoose.schema;

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
  title: {
    type: String,
    required: true
  }
});
