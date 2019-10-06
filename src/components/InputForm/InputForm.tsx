import React, { useState } from 'react';
import bem from 'bera';

const componentClass = bem('inputForm');

interface ToDoFormProps {
    formType?: string;
    buttonLabel: string;
    onSubmitForm: any;
}

const InputForm = ({ formType = 'add', buttonLabel, onSubmitForm }: ToDoFormProps) => {
    const [value, setValue] = useState<string>('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (value !== '') {
            onSubmitForm(value);
            setValue('');
        }
    };

    const handleInputChange = (e: any) => {
        e.preventDefault();
        setValue(e.target.value);
    };

    return (
        <form className={componentClass()} onSubmit={handleSubmit}>
            <input
                data-testid={`inputForm-textInput-${formType}`}
                type="text"
                value={value}
                onChange={handleInputChange}
            />
            <button data-testid={`inputForm-submitButton-${formType}`} type="submit">
                {buttonLabel}
            </button>
        </form>
    );
};

export default InputForm;
