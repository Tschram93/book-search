const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Book {
		bookId: String!
		title: String!
		authors: [String!]
		description: String!
		image: String!
	}

	type User {
		_id: ID!
		username: String!
		email: String!
		password: String!
		savedBooks: [Book]
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me(_id: ID!): User
	}

	input BookInput {
		bookId: String!
		title: String!
		authors: [String!]
		description: String!
		image: String!
	}

	type Mutation {
		createUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		saveBook(_id: ID!, book: BookInput!): User
		deleteBook(_id: ID!, bookId: String!): User
	}
`;

module.exports = typeDefs;
