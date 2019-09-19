import React from 'react';
import bem from 'bera';
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
                <h1 className={componentClass('title')}>ToDo List with hooks and GraphQL</h1>
                <ToDoApp />
            </div>
        );
    }
}

export default Home;
