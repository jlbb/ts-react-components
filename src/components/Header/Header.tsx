import * as React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div>
                <span className={'icon-home'} />
                <h1 className={'header'}>Wow World! This is TypeScript boilerplate (Header component). Using TS!</h1>
            </div>
        );
    }
}

export default Header;
