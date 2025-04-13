import { useState } from 'react';

export const useForm = (initialForm = {}, validateForm = () => {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formErrors, setFormErrors] = useState({});

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
        setFormErrors({});
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm(formState);
        setFormErrors(errors);
    };

    return {
        ...formState,
        formErrors,
        onInputChange,
        onResetForm,
        onSubmit,
    };
}