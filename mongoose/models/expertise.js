const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Expertise", expertiseSchema);
