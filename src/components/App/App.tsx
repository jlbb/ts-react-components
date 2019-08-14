import * as React from 'react';

type Props = typeof defaultProps;
type State = typeof defaultState;

const defaultProps = {};
const defaultState = {};

class App extends React.Component<Props, State> {
    static readonly defaultProps = defaultProps;
    readonly state = defaultState;

    render() {
        return (
            <div>
                <h1 className="title">Hola public World!</h1>
                <div className={'learning-icon'} />

                {this.props.children}
            </div>
        );
    }
}

export default App;
