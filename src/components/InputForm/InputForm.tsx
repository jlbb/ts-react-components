import React, { useState } from 'react';
import bem from 'bera';

const componentClass = bem('inputForm');

const InputForm = ({ addToDo }: any) => {
    const [value, setValue] = useState<string>('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addToDo(value);
        setValue('');
    };

    const handleInputChange = (e: any) => {
        e.preventDefault();
        setValue(e.target.value);
    };

    return (
        <form className={componentClass()} onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleInputChange} />
            <button type="submit">Add ToDo item</button>
        </form>
    );
};

export default InputForm;
