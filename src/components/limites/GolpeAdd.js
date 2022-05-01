import React, { useEffect, useState } from 'react';
import { useForm2 } from '../../hooks/useForm2';

export const GolpeAdd = ({ handleAddGolpe }) => {

    const [limiteFinal25Golpes, setLimiteFinal25Golpes] = useState(0);

    useEffect(() => {
        setLimiteFinal25Golpes(localStorage.getItem('limite25') || '0');
    }, [])



    const [{ description }, handleInputChange, reset] = useForm2({
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newGolpe = {
            id: new Date().getTime(),
            desc: description,
            done: false
        };

        const action = {
            type: 'add',
            payload: newGolpe
        }

        handleAddGolpe(newGolpe);
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
