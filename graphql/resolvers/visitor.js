const Visitor = require("../../mongoose/models/visitor");

module.exports = {
  visitors: async () => {
    try {
      let populatedVisitors;

      await Visitor.find()
        .populate("meetups")
        .exec()
        .then(result => {
          populatedVisitors = result;
        });
      return populatedVisitors;
    } catch (error) {
      throw new Error("Failed to fetch visitors:: ", error);
    }
  }
};
