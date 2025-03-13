// src/hooks/useForm.js
import { useState } from 'react';

export const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });

        if (touched[name] && validate) {
            const validationErrors = validate({ ...values, [name]: value });
            setErrors(validationErrors);
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });

        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
        }
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    const validateForm = () => {
        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
            return Object.keys(validationErrors).length === 0;
        }
        return true;
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        resetForm,
        setValues,
        validateForm
    };
};