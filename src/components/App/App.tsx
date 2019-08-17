import React from 'react';
import bem from 'bera';

import Header from '../Header';

type Props = typeof defaultProps;
type State = typeof defaultState;

const defaultProps = {};
const defaultState = {};

const componentClass = bem('app');

class App extends React.Component<Props, State> {
    static readonly defaultProps = defaultProps;
    readonly state = defaultState;

    render() {
        return (
            <div className={componentClass()}>
                <Header />

                {this.props.children}
            </div>
        );
    }
}

export default App;
