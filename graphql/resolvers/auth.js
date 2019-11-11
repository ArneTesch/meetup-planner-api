const User = require("../../mongoose/models/user");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async args => {
    const { email, password } = args.userInput;
    try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email: email,
        password: hashedPassword
      });

      const result = await user.save();
      return {
        ...result._doc,
        password: null
      };
    } catch (error) {
      throw error;
    }
  }
};
