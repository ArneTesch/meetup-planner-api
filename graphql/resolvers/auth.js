const User = require("../../mongoose/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exist");
    }

    const isEqualPass = bcrypt.compare(password, user.password);
    if (!isEqualPass) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.PRIVATE_KEY,
      {
        expiresIn: "1h"
      }
    );

    return {
      userId: user._id,
      token,
      tokenExpiration: 1
    };
  }
};
