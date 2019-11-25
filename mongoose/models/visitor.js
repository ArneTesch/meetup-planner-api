const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitorSchema = new Schema({
  lastName: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  meetups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meetup"
    }
  ]
});

module.exports = mongoose.model("Visitor", visitorSchema);
