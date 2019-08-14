import * as React from 'react';
import App from './components/App';
import Header from './components/Header';

import './styles/globals.scss';

class Root extends React.PureComponent {
    render() {
        return (
            <div id="root">
                <App>
                    <Header />
                </App>
            </div>
        );
    }
}

export default Root;
