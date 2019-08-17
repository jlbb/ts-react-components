import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import Home from './components/Home';

import ReactDOM from 'react-dom';

import './styles/globals.scss';

const RootApp = () => {
    return (
        <Router>
            <App>
                <Route component={Home} exact path="/" />
            </App>
        </Router>
    );
};

ReactDOM.render(RootApp(), document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
