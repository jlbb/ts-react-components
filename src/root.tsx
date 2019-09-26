import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloLink, concat } from 'apollo-link';
import { stripTypenames } from './graphql/utils';

import App from './components/App';
import Home from './components/Home';

import './styles/globals.scss';

const httpLink = new HttpLink({
    uri: 'http://localhost:7000/graphql',
});

// @ts-ignore
const removeTypenameMiddleware = new ApolloLink((operation, forward) => {
    if (operation.variables) {
        operation.variables = stripTypenames(operation.variables, '__typename');
        return forward ? forward(operation) : null;
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(removeTypenameMiddleware, httpLink),
});

const RootApp = () => {
    return (
        <Router>
            <ApolloProvider client={client}>
                <App>
                    <Route component={Home} exact path="/" />
                </App>
            </ApolloProvider>
        </Router>
    );
};

ReactDOM.render(RootApp(), document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
