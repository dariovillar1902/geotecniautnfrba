import React, { useState } from 'react'

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState)

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ({ target }) => {
        target.value <= 100 && target.value >= 0 ?
            setValues({
                ...values,
                [target.name]: target.value
            })
            : setValues({
                ...values
            })
    }

    return [values, handleInputChange, reset];

}

// Recibe informacion de un formulario en forma de objeto.
