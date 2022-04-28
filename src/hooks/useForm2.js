import React, { useState } from 'react'

export const useForm2 = (initialState = {}) => {

    const [values, setValues] = useState(initialState)

    const reset = (newFormState = initialState) => {
        setValues(newFormState);
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    return [values, handleInputChange, reset];

}


// Recibe informacion de un formulario en forma de objeto.
