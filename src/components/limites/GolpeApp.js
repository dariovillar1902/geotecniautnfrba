import React, { useEffect, useReducer, useState } from 'react';
import { Accordion } from 'react-bootstrap';
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

    let [golpes, dispatch] = useReducer(golpeReducer, [], init);

    let [limites, dispatch2] = useReducer(limiteReducer, [], init2);

    let [limiteFinal25Golpes, setLimiteFinal25Golpes] = useState(0);

    const [finFuncion1, setFinFuncion1] = useState(0);

    const [finFuncion2, setFinFuncion2] = useState(0);

    const [limitePlasticoPromedio, setLimitePlasticoPromedio] = useState(0);

    let idsGolpes = [];

    let x = [];

    let y = [];

    let idsLimites = [];
    let humedades = [];

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

    const handleCuenta = (golpeId, numeroGolpes, humedad) => {
        if (idsGolpes.includes(golpeId)) {
            x[idsGolpes.findIndex(id => id === golpeId)] = Math.log10(parseInt(numeroGolpes));
            y[idsGolpes.findIndex(id => id === golpeId)] = humedad;
        } else {
            idsGolpes = [...idsGolpes, golpeId];
            x = [...x, Math.log10(parseInt(numeroGolpes))];
            y = [...y, humedad];
        }

        let hayNan = false;

        for (let i = 0; i < idsGolpes.length; i++) {
            if (x[i] === false || Number.isNaN(x[i]) || y[i] === false || Number.isNaN(y[i])) {
                hayNan = true;
            }
        }

        if (hayNan === false && idsGolpes.length >= 3) {
            linearRegression(x, y);
        }

    }

    const handleCuenta2 = (limiteId, humedad) => {
        if (idsLimites.includes(limiteId)) {
            humedades[idsLimites.findIndex(id => id === limiteId)] = humedad;
        } else {
            idsLimites = [...idsLimites, limiteId];
            humedades = [...humedades, humedad];
        }

        console.log(humedades);

        var n = humedades.length;
        var suma = 0;
        var cantidad = humedades.length;
        var promedio = 0.0;

        for (var i = 0; i < n; i++) {
            suma += parseFloat(humedades[i]);
        }

        promedio = suma / cantidad;
        setLimitePlasticoPromedio(promedio * 100);

    }

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

        let pendiente;
        let ordenadaOrigen;
        let limiteLiquido25;
        let limitesLiquidos25 = [];
        promedioX = sum_x / cantidad;
        promedioY = sum_y / cantidad;
        for (let j = 0; j < cantidad; j++) {
            pendiente = (x[j] - promedioX) / (y[j] - promedioY);
            ordenadaOrigen = x[j] - pendiente * y[j];
            limiteLiquido25 = pendiente * Math.log10(25) + ordenadaOrigen;
            limitesLiquidos25 = [...limitesLiquidos25, limiteLiquido25];
        }
        filtroYPromedio(limitesLiquidos25);
    }

    function filtroYPromedio(valores) {
        let suma = 0;
        let cantidad = valores.length;
        for (let i = 0; i < cantidad; i++) {
            suma += parseFloat(valores[i]);
        }
        let promedio = suma / cantidad;

        let valoresDiferencia = [];
        let min;
        let max;
        for (let j = 0; j < cantidad; j++) {
            valoresDiferencia.push(valores[j] - promedio);
        }
        min = Math.min(...valoresDiferencia);
        max = Math.max(...valoresDiferencia);

        let valoresFiltradosMax = valores.filter(limLiquido => limLiquido - promedio !== min);
        let valoresFiltradosMin = valoresFiltradosMax.filter(limLiquido => limLiquido - promedio !== max);

        let suma2 = 0;
        let cantidad2 = valoresFiltradosMin.length;
        for (let k = 0; k < cantidad2; k++) {
            suma2 += parseFloat(valoresFiltradosMin[k]);
        }
        let promedio2 = suma2 / cantidad2;
        let valorFinal = promedio2 * 100;
        setFinFuncion1(valorFinal);
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
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><b>Instrucciones (leer) </b></Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>
                                Con el botón 'Agregar' se crean nuevas filas en la tabla para introducir los datos.
                            </li>
                            <li>
                                El único dato que puede quedar vacío (si no está especificado por enunciado) es el <b>peso del pesafiltro.</b>
                            </li>
                            <li>
                                El resto de los datos deben completarse sí o sí.
                            </li>
                            <li>
                                <b>IMPORTANTE: el dato del límite líquido es estimado</b>, ya que es difícil programar la recta de regresión. Es recomendable chequear el resultado obtenido mediante planilla de Excel.
                            </li>
                            <li>
                                Si se introduce una sola medición de límite líquido, el correcto es el de tabla, NO es 0%.
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='espacio'></div>
        </div>
        <div className='row'>
            <div className='col-7'>

                <GolpeList
                    golpes={golpes}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle}
                    handleCuenta={handleCuenta} />

            </div>
            <div className='col-5'>
                <GolpeAdd
                    handleAddGolpe={handleAddGolpe} />
                <div className='espacio'></div>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>{'Límite líquido para 25 golpes: ' + finFuncion1.toFixed(2) + '%'}</h5>
                    </div>
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='col-7'>

                <LimiteList
                    limites={limites}
                    handleDelete={handleDeleteLimite}
                    handleToggle={handleToggleLimite}
                    handleCuenta2={handleCuenta2} />

            </div>
            <div className='col-5'>
                <LimiteAdd
                    handleAddLimite={handleAddLimite} />
                <div className='espacio'></div>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>{limitePlasticoPromedio ? ('Límite plástico para 25 golpes: ' + limitePlasticoPromedio.toFixed(2) + '%') : ('Límite plástico para 25 golpes: 0%')}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};
