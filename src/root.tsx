import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import App from './components/App';
import Home from './components/Home';

import './styles/globals.scss';

const client = new ApolloClient({
    cache: new InMemoryCache({
        freezeResults: true,
    }),
    typeDefs,
    resolvers,
    assumeImmutableResults: true,
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
