import React, { useState } from 'react';
import bem from 'bera';

interface Header {
    title?: string;
}

const defaultHeader: Header = {
    title: 'Hi user',
};

const componentClass = bem('header');

const Header = (props?: Header): React.ReactElement => {
    const [title] = useState<Header['title']>((props && props.title) || defaultHeader.title);

    return (
        <div className={componentClass()}>
            <h1 className={componentClass('title')}>{title}, this is a React project with TypeScript</h1>
        </div>
    );
};

export default Header;
