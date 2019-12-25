const User = require("../../mongoose/models/user");

module.exports = {
  users: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
};
