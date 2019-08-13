import * as React from 'react';
import butterflyIcon from '../../../public/images/butterfly.svg';

class Header extends React.Component {
    render() {
        return (
            <div>
                <img src={butterflyIcon} alt="" />
                <span className={'icon-home'} />
                <h1 className={'header'}>Wow World! This is TypeScript boilerplate (Header component). Using TS!</h1>
            </div>
        );
    }
}

export default Header;
