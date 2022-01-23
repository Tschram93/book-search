const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
	Query: {
		me: async (parent, { _id }) => {
			return await User.findById(_id);
		},
	},
	Mutation: {
		createUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('No Profile with that email');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect password!');
			}
			const token = signToken(user);
			return { token, user };
		},
		saveBook: async (parent, { _id, book }) => {
			const updatedUser = await User.findByIdAndUpdate(_id, {
				$push: { savedBooks: book },
			});
			return updatedUser;
		},
		deleteBook: async (parent, { _id, bookId }) => {
			const updatedUser = await User.findByIdAndUpdate(_id, {
				$pull: { savedBooks: { bookId } },
			});
			return updatedUser;
		},
	},
};

module.exports = resolvers;
