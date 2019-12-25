const User = require("../../mongoose/models/user");
const Visitor = require("../../mongoose/models/visitor");
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
      const token = jwt.sign(
        {
          userId: result._doc._id,
          email: result._doc.email,
          isAdmin: true
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "1h"
        }
      );

      return {
        userId: result._doc._id,
        token,
        tokenExpiration: 1
      };
    } catch (error) {
      throw error;
    }
  },
  createVisitor: async args => {
    const { lastName, firstname, email, password, meetups } = args.visitorInput;

    try {
      const existingVisitor = await Visitor.findOne({ email: email });
      if (existingVisitor) {
        throw new Error("Visitor already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newVisitor = new Visitor({
        lastName,
        firstname,
        email,
        password: hashedPassword,
        meetups
      });

      const result = await newVisitor.save();

      return {
        ...result._doc,
        password: null
      };
    } catch (error) {
      throw error;
    }
  },
  adminLogin: async ({ email, password }) => {
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
        email: user.email,
        isAdmin: true
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
  },
  visitorLogin: async ({ email, password }) => {
    const visitor = await Visitor.findOne({ email });

    if (!visitor) {
      throw new Error("Visitor does not exist");
    }

    const isEqualPass = bcrypt.compare(password, visitor.password);
    if (!isEqualPass) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign(
      {
        visitorId: visitor._id,
        email: visitor.email,
        isAdmin: false
      },
      process.env.PRIVATE_KEY,
      {
        expiresIn: "1h"
      }
    );

    return {
      visitorId: visitor._id,
      token,
      tokenExpiration: 1
    };
  }
};
