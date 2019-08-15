import * as React from 'react';
import bem from 'bera';

import butterflyIcon from '../../../public/images/butterfly.svg';

type Props = typeof defaultProps;
type State = typeof defaultState;

const defaultProps = { title: 'Hi world' };
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
                <img alt="" src={butterflyIcon} />
                <span className={componentClass('icon-home')} />
                <h1 className={componentClass('title')}>
                    {this.props.title} This is TypeScript boilerplate (Header component). Using TS!
                </h1>
            </div>
        );
    }
}

export default Header;
