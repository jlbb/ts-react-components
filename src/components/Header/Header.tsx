import React from 'react';
import bem from 'bera';

type Props = typeof defaultProps;
type State = typeof defaultState;

const defaultProps = { title: 'Hi user' };
const defaultState = {
    active: true,
};

const componentClass = bem('header');

class Header extends React.Component<Props, State> {
    static readonly defaultProps = defaultProps;
    readonly state = defaultState;

    printPropsState = (): void => {
        console.log('Props: ', this.props);
        console.log('State: ', this.state);
    };

    render() {
        this.printPropsState();
        return (
            <div className={componentClass()}>
                <h1 className={componentClass('title')}>{this.props.title}, this is a React project with TypeScript</h1>
            </div>
        );
    }
}

export default Header;
