import React, { useEffect, useState } from 'react';
import { useForm2 } from '../hooks/useForm2';

export const GolpeListItem = ({ golpe, index, handleDelete, handleToggle }) => {

    const [formValues, handleInputChange, reset] = useForm2();

    const [humedad, setHumedad] = useState([]);
    const [limiteLiquido, setLimiteLiquido] = useState([]);

    const { numeroGolpes, pesoSueloHumedo, pesoSueloSeco, pesoPesafiltro } = formValues;

    let x, y;

    useEffect(() => {
        if (pesoPesafiltro === undefined) {
            setHumedad((pesoSueloHumedo - pesoSueloSeco) / pesoSueloSeco);

        } else {
            setHumedad(((pesoSueloHumedo - pesoPesafiltro) - (pesoSueloSeco - pesoPesafiltro)) / (pesoSueloSeco - pesoPesafiltro));
        }
        setLimiteLiquido(humedad * Math.pow(numeroGolpes / 25, 0.121));
        x = [Math.log10(24), Math.log10(27), Math.log10(28), Math.log10(29)];
        y = [0.708, 0.698, 0.699, 0.7];
        linearRegression(x, y);

    }, [formValues]);

    function linearRegression(y, x) {
        var n = y.length;
        var sum_x = 0;
        var sum_y = 0;
        var cantidad = y.length;
        var promedioX = 0.0;
        var promedioY = 0.0;

        for (var i = 0; i < n; i++) {
            sum_x += parseFloat(x[i]);
            sum_y += parseFloat(y[i]);
        }


        //
        let pendiente;
        let ordenadaOrigen;
        let limiteLiquido25;
        promedioX = sum_x / cantidad;
        promedioY = sum_y / cantidad;
        pendiente = (x[0] - promedioX) / (y[0] - promedioY);
        ordenadaOrigen = x[0] - pendiente * y[0];
        limiteLiquido25 = pendiente * Math.log10(25) + ordenadaOrigen;

        console.log('Limite Liquido 25 golpes: ' + limiteLiquido25 * 100);
        return limiteLiquido;

    }

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
        {/*<td>
                    <input
                        type="number"
                        max="100"
                        min="0"
                        className={'form-control' + (formValues[tamiz.id] !== undefined ? ' test' : '')}
                        id="exampleFormControlInput1"
                        name={tamiz.id}
                        value={formValues[tamiz.id]}
                        onChange={handleInputChange} />
                </td>
                <td>
                    <input
                        type="number"
                        max="100"
                        min="0"
                        className={'form-control' + (formValues[tamiz.id] !== undefined ? ' test' : '')}
                        id="exampleFormControlInput1"
                        name={tamiz.id}
                        value={formValues[tamiz.id]}
                        onChange={handleInputChange} />
                </td>
                <td>
                    0
                </td>*/}
    </tr>
};
