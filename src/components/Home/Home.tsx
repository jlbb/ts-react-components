import React from 'react';
import bem from 'bera';
import Header from '../Header';
import ToDoApp from '../ToDoApp';

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
                <Header />
                <ToDoApp />
            </div>
        );
    }
}

export default Home;
