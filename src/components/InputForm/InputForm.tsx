import React, { useState } from 'react';
import bem from 'bera';

const componentClass = bem('inputForm');

interface ToDoFormProps {
    buttonLabel: string;
    onSubmitForm: any;
}

const InputForm = ({ buttonLabel, onSubmitForm }: ToDoFormProps) => {
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
            <input type="text" value={value} onChange={handleInputChange} />
            <button type="submit">{buttonLabel}</button>
        </form>
    );
};

export default InputForm;
