import React, { useEffect, useReducer } from 'react';
import { GolpeAdd } from './GolpeAdd';
import { GolpeList } from './GolpeList';
import { golpeReducer } from './golpeReducer';
import { LimiteAdd } from './LimiteAdd';
import { LimiteList } from './LimiteList';
import { limiteReducer } from './limiteReducer';

const init = () => {
    return JSON.parse(localStorage.getItem('golpes')) || [];

}

const init2 = () => {
    return JSON.parse(localStorage.getItem('limites')) || [];
}

export const GolpeApp = () => {

    const [golpes, dispatch] = useReducer(golpeReducer, [], init);

    const [limites, dispatch2] = useReducer(limiteReducer, [], init2);

    useEffect(() => {
        localStorage.setItem('golpes', JSON.stringify(golpes));
    }, [golpes]);

    useEffect(() => {
        localStorage.setItem('limites', JSON.stringify(limites));
    }, [limites]);

    const handleDelete = (golpeId) => {

        const action = {
            type: 'delete',
            payload: golpeId
        }

        dispatch(action);

    }

    const handleAddGolpe = (newGolpe) => {

        dispatch({
            type: 'add',
            payload: newGolpe
        });
    }

    const handleToggle = (golpeId) => {

        dispatch({
            type: 'toggle',
            payload: golpeId
        });

    }

    const handleDeleteLimite = (limiteId) => {

        const action = {
            type: 'delete',
            payload: limiteId
        }

        dispatch2(action);

    }

    const handleAddLimite = (newLimite) => {

        dispatch2({
            type: 'add',
            payload: newLimite
        });
    }

    const handleToggleLimite = (limiteId) => {

        dispatch2({
            type: 'toggle',
            payload: limiteId
        });

    }

    return <div className='container mt-5'>
        <h1> Unidad 2 - Límite Líquido y Límite Plástico </h1>
        <hr />
        <div className='row'>
            <div className='col-7'>

                <GolpeList
                    golpes={golpes}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle} />

            </div>
            <div className='col-5'>
                <GolpeAdd
                    handleAddGolpe={handleAddGolpe} />
            </div>
        </div>
        <div className='row'>
            <div className='col-7'>

                <LimiteList
                    limites={limites}
                    handleDelete={handleDeleteLimite}
                    handleToggle={handleToggleLimite} />

            </div>
            <div className='col-5'>
                <LimiteAdd
                    handleAddLimite={handleAddLimite} />
            </div>
        </div>
    </div>;
};
