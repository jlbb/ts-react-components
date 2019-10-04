import * as React from 'react';
import { render, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Home from '../components/Home/Home';

describe('Home', () => {
    test('element renders', () => {
        const { container } = render(
            <MockedProvider>
                <Home />
            </MockedProvider>,
        );

        wait();
        expect(container.firstChild).toBeDefined();
    });
});
