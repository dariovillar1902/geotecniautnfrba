import React, { useEffect, useState } from 'react';
import { useForm2 } from '../../hooks/useForm2';

export const GolpeListItem = ({ golpe, index, handleDelete, handleToggle, handleCuenta }) => {

    const [formValues, handleInputChange, reset] = useForm2();

    const [humedad, setHumedad] = useState([]);
    const [limiteLiquido, setLimiteLiquido] = useState([]);

    const { numeroGolpes, pesoSueloHumedo, pesoSueloSeco, pesoPesafiltro } = formValues;

    useEffect(() => {
        if (pesoPesafiltro === undefined) {
            setHumedad((pesoSueloHumedo - pesoSueloSeco) / pesoSueloSeco);

        } else {
            setHumedad(((pesoSueloHumedo - pesoPesafiltro) - (pesoSueloSeco - pesoPesafiltro)) / (pesoSueloSeco - pesoPesafiltro));
        }
        setLimiteLiquido(humedad * Math.pow(numeroGolpes / 25, 0.121));

    }, [formValues]);

    useEffect(() => {
        handleCuenta(golpe.id, numeroGolpes, humedad);

    }, [numeroGolpes, humedad, formValues, handleCuenta, golpe.id])

    return <tr key={golpe.id}>
        <td>
            <input
                type="number"
                max="100"
                min="0"
                className={'form-control' + (numeroGolpes !== undefined ? ' test' : '')}
                id="exampleFormControlInput1"
                name='numeroGolpes'
                value={numeroGolpes}
                onChange={handleInputChange} />
        </td>
        <td>
            <input
                type="number"
                max="100"
                min="0"
                className={'form-control' + (pesoSueloHumedo !== undefined ? ' test' : '')}
                id="exampleFormControlInput1"
                name='pesoSueloHumedo'
                value={pesoSueloHumedo}
                onChange={handleInputChange} />
        </td>
        <td>
            <input
                type="number"
                max="100"
                min="0"
                className={'form-control' + (pesoSueloSeco !== undefined ? ' test' : '')}
                id="exampleFormControlInput1"
                name='pesoSueloSeco'
                value={pesoSueloSeco}
                onChange={handleInputChange} />
        </td>
        <td>
            <input
                type="number"
                max="100"
                min="0"
                className={'form-control' + (pesoPesafiltro !== undefined ? ' test' : '')}
                id="exampleFormControlInput1"
                name='pesoPesafiltro'
                value={pesoPesafiltro}
                onChange={handleInputChange} />
        </td>
        <td>
            {humedad ? (humedad * 100).toFixed(2) : ''} %
        </td>
        <td>
            {limiteLiquido ? (limiteLiquido * 100).toFixed(2) : ''} %
        </td>
        <td>
            <button
                className='btn btn-danger'
                onClick={() => handleDelete(golpe.id)}> Borrar </button>
        </td>
    </tr>
};
