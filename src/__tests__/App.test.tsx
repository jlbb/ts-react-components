import * as React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App/App';

describe('My App default test case', () => {
    it('Should pass this test at any case', () => {
        expect(true).toEqual(true);
    });
});

describe('App', () => {
    test('snapshot renders', () => {
        const component = renderer.create(
            <App>
                <h1>Hi World!</h1>
            </App>,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
