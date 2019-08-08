import * as React from 'react';
import Header from './components/Header';

class Root extends React.PureComponent {
    render() {
        return (
            <div id="root">
                <Header />
            </div>
        );
    }
}

export default Root;
