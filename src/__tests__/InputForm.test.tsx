import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import InputForm from '../components/InputForm/InputForm';

afterEach(cleanup);

describe('InputForm', () => {
    const submitForm = jest.fn();
    const buttonLabel = 'Submit';

    test('element renders', () => {
        const { container } = render(<InputForm buttonLabel={buttonLabel} onSubmitForm={submitForm} />);

        expect(container.firstChild).toBeDefined();
    });

    test('element renders', () => {
        const newValue = 'Testing value';
        const { getByTestId } = render(<InputForm buttonLabel={buttonLabel} onSubmitForm={submitForm} />);

        fireEvent.change(getByTestId('inputForm-textInput'), { target: { value: newValue } });
        getByTestId('inputForm-submitButton').click();

        expect(submitForm).toBeCalledWith(newValue);
        expect(submitForm).toHaveBeenCalledTimes(1);
    });
});
