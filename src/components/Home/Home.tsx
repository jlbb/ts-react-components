import React from 'react';
import bem from 'bera';

type Props = typeof defaultProps;
type State = typeof defaultState;

const defaultProps = {};
const defaultState = {};

const componentClass = bem('home');

class Home extends React.Component<Props, State> {
    static readonly defaultProps = defaultProps;
    readonly state = defaultState;

    render() {
        return (
            <div className={componentClass()}>
                <h1 className={componentClass('title')}>Hola public World!</h1>
                <div className={componentClass('learningIcon')} />
            </div>
        );
    }
}

export default Home;
