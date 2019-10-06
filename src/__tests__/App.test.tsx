import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import App from '../components/App/App';

afterEach(cleanup);

describe('My App default test case', () => {
    it('should pass this test at any case', () => {
        expect(true).toEqual(true);
    });
});

describe('App', () => {
    test('snapshot without children renders', () => {
        const { container } = render(<App />);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('snapshot with some children renders', () => {
        const { container } = render(
            <App>
                <h1>Hi World!</h1>
                <p>Lorem ipsum</p>
            </App>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
