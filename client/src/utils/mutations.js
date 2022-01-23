import { gql } from '@apollo/client';

export const CREATE_USER = gql`
	mutation CreateUser($username: String!, $email: String!, $password: String!) {
		createUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
				email
				password
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
				email
				password
			}
		}
	}
`;

export const SAVE_BOOK = gql`
	mutation SaveBook($_id: ID!, $book: BookInput!) {
		saveBook(_id: $_id, book: $book) {
			username
			savedBooks {
				title
			}
		}
	}
`;

export const DELETE_BOOK = gql`
mutation DeleteBook($_id: ID!, $bookId: String!) {
	deleteBook(_id: $_id, bookId: $bookId) {
			savedBooks {
				title
			}
		}
	}
`;
