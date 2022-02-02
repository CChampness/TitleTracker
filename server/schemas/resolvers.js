const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      console.log("Mutation, addUser: ", username);
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      console.log("Mutation, token, user: ", token,",",user);
      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      console.log("Mutation, loginUser email: ", email);
      const user = await User.findOne({ email });
      console.log("Mutation, loginUser user: ", user);

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      console.log("Mutation, signToken: ", token);

      return { token, user };
    },

    saveBook: async (parent, { BookInput }, context) => {
      console.log("saveBook");
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { saveBook: BookInput } },
          {new: true}
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const book = await Book.findOneAndDelete({
          _id: bookId,
          title: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: book._id } }
        );

        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
