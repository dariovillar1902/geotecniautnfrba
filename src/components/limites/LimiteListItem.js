import React, { useEffect, useState } from 'react';
import { useForm2 } from '../../hooks/useForm2';

export const LimiteListItem = ({ limite, index, handleDelete, handleToggle, handleCuenta2 }) => {

    const [formValues, handleInputChange, reset] = useForm2();

    const [humedad, setHumedad] = useState([]);
    const [limitePlastico, setLimitePlastico] = useState([]);

    const { pesoSueloHumedo, pesoSueloSeco, pesoPesafiltro } = formValues;

    useEffect(() => {
        if (pesoPesafiltro === undefined) {
            setHumedad((pesoSueloHumedo - pesoSueloSeco) / pesoSueloSeco);

        } else {
            setHumedad(((pesoSueloHumedo - pesoPesafiltro) - (pesoSueloSeco - pesoPesafiltro)) / (pesoSueloSeco - pesoPesafiltro));
        }
        setLimitePlastico(humedad);

    }, [formValues, humedad, pesoPesafiltro, pesoSueloHumedo, pesoSueloSeco]);

    useEffect(() => {
        handleCuenta2(limite.id, humedad);

    }, [humedad, formValues, handleCuenta2, limite.id])

    return <tr key={limite.id}>
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
            <button
                className='btn btn-danger'
                onClick={() => handleDelete(limite.id)}> Borrar </button>
        </td>
    </tr>
};