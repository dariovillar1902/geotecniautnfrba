import React from 'react';
import { useForm2 } from '../hooks/useForm2';

export const LimiteAdd = ({ handleAddLimite }) => {

    const [{ description }, handleInputChange, reset] = useForm2({
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newLimite = {
            id: new Date().getTime(),
            desc: description,
            done: false
        };

        const action = {
            type: 'add',
            payload: newLimite
        }

        handleAddLimite(newLimite);
        reset();
    }
    return <>

        <form>

            <button
                type='submit'
                onClick={handleSubmit}
                className='btn btn-outline-primary mt-1 btn-block'>
                Agregar

            </button>

        </form>
        <hr />
    </>;
};
