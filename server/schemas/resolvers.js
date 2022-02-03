const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  // Query: {
  //   me: async (parent, args, context) => {
  //     console.log("context: ",context);
  //     if (context.user) {
  //       const x =  await User.findOne({ _id: context.user._id }).populate('savedBooks');
  //       console.log("x",x);
  //       return x;
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  // },

    Query: {
    me: async (parent, args, context) => {
      console.log("context: ",context);
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
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

    saveBook: async (parent, { BookData }, context) => {
      console.log("saveBook for user: ", context.user);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: BookData } },
          {new: true}
        );

        console.log("updatedUser: ", updatedUser);

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
