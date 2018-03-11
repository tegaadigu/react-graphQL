/**
 * Created by Tega on 10/03/2018.
 */
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const contacts = require('./contacts.json').contacts;
var cors = require('cors')

// The GraphQL schema in string form
const typeDefs = `
  type Query { contacts: [Contact], contact(id: Int): [Contact] }
  type Contact { firstname: String, lastname: String, contactId: Int, phone: String, address: String, email: String}
`;

// The resolvers
const resolvers = {
    Query: {
      contacts: () => contacts,
      contact: (contactId, args) => {
        let result = contacts.filter(item => item.contactId === args.id);
        return result;
      }
    },
  };

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

app.use(cors({credentials: true, origin: true})); //allow cross origin.

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(8080, () => {
  console.log('Go to http://localhost:8080/graphiql to run queries!');
});