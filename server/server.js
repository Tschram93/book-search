const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground: true,
	introspection: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/index.html'));
	});
}
// app.use(routes);

db.once('open', async () => {
	await server.start();

	server.applyMiddleware({ app });

	app.listen(PORT, () => {
		console.log(`Now listening on localhost: ${PORT}`);
		console.log(
			`GraphQL playground avaialble at http://localhost:${PORT}${server.graphqlPath}`
		);
	});
});
