import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { gql } from 'apollo-boost';
import './index.css';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import { setContext } from 'apollo-link-context';
import { AUTH_TOKEN } from './constants';

const authLink = setContext((_,{ headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const HTTPLink = createHttpLink({
  uri: 'https://live-pulse-server.herokuapp.com/'
});

const client = new ApolloClient({
  link: authLink.concat(HTTPLink),
  cache: new InMemoryCache()
});

// test the apollo query client, remove afterwards
client.query({
  query: gql`{
    dashboard(id: $ID) {
      title
      icon
      createdAt
    }
  }`
}).then(result => console.log(result));
//  end testing

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
