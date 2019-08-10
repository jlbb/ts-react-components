import * as React from 'react';
import ReactDOM from 'react-dom';

import RootApp from './root';

import './styles/app.scss';

ReactDOM.render(<RootApp />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}
