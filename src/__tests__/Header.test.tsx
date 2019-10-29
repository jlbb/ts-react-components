import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import Header from '../components/Header/Header';

afterEach(cleanup);

describe('Header', () => {
    test('element renders', () => {
        const { container } = render(<Header />);

        expect(container.firstChild).toBeDefined();
    });

    test('without title prop renders with default value', () => {
        const { getByText } = render(<Header />);

        expect(getByText(/Hi/i).textContent).toContain('Hi user');
    });

    test('with title prop renders using that value', () => {
        const title = 'Hi Big Joe!';
        const { getByText } = render(<Header title={title} />);

        expect(getByText(/Hi/i).textContent).toContain(title);
    });
});
