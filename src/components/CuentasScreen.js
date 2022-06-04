import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Accordion, Table } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';
import { listaTamices } from '../data/listaTamices';
import { useForm } from '../hooks/useForm';

export const CuentasScreen = () => {

    const [porcentajesPasan, setPorcentajesPasan] = useState([]);
    const [porcentajesRetenido, setPorcentajesRetenido] = useState([]);
    const [porcentajesCorreccion, setPorcentajesCorreccion] = useState([]);

    const [grava, setGrava] = useState([]);
    const [arena, setArena] = useState([]);

    const [diametro10, setDiametro10] = useState([]);
    const [diametro30, setDiametro30] = useState([]);
    const [diametro60, setDiametro60] = useState([]);

    const [coeficienteCurvatura, setCoeficienteCurvatura] = useState([]);
    const [coeficienteUniformidad, setCoeficienteUniformidad] = useState([]);
    const [denominacionFinal, setDenominacionFinal] = useState([]);

    const [formValues, handleInputChange] = useForm();

    const [limiteLiquido, setLimiteLiquido] = useState([]);
    const [limitePlastico, setLimitePlastico] = useState([]);
    const [lineaA, setLineaA] = useState([]);

    const [denominacionAASHTO, setDenominacionAASHTO] = useState([]);
    const [indiceGrupo, setIndiceGrupo] = useState([]);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        let listaFiltrada = listaTamices.filter(tamiz => formValues[tamiz.id] !== undefined);

        let map = listaTamices.map((tamiz, indice) => {
            if (listaFiltrada.filter(filtro => filtro.id === tamiz.id).length > 0) {
                return parseFloat(formValues[tamiz.id]);
            } else {
                for (let i = tamiz.id; i <= 24; i++) {
                    if (listaFiltrada.filter(filtro => filtro.id === i).length > 0) {
                        return parseFloat(formValues[i]);
                    }
                }
            }
        });

        let map2 = listaTamices.map((tamiz, indice) => {
            if (listaFiltrada.filter(filtro => filtro.id === tamiz.id).length > 0) {
                return 100 - parseFloat(formValues[tamiz.id]);
            } else {
                for (let i = tamiz.id; i <= 24; i++) {
                    if (listaFiltrada.filter(filtro => filtro.id === i).length > 0) {
                        return 100 - parseFloat(formValues[i]);
                    }
                }
            }
        });

        if (parseFloat(formValues[2]) !== 100) {
            let map3 = listaTamices.map((tamiz, indice) => {
                if (listaFiltrada.filter(filtro => filtro.id === tamiz.id).length > 0) {
                    return parseFloat(formValues[tamiz.id]) * 100 / parseFloat(formValues[2]);
                } else {
                    for (let i = tamiz.id; i <= 24; i++) {
                        if (listaFiltrada.filter(filtro => filtro.id === i).length > 0) {
                            return parseFloat(formValues[i]) * 100 / parseFloat(formValues[2]);
                        }
                    }
                }
            });
            setPorcentajesCorreccion(map3);
        } else {
            setPorcentajesCorreccion(map);
        }
        setPorcentajesPasan(map);
        setPorcentajesRetenido(map2);

        if (porcentajesCorreccion[2] !== undefined && porcentajesCorreccion[12] !== undefined) {
            setGrava(porcentajesCorreccion[2] - porcentajesCorreccion[12]);
        }
        if (porcentajesCorreccion[12] !== undefined && porcentajesCorreccion[22] !== undefined) {
            setArena(porcentajesCorreccion[12] - porcentajesCorreccion[22]);
        }

        function buscarDiametro(diametro) {
            let diametrosMenores = listaFiltrada.filter(tamiz => formValues[tamiz.id] <= diametro);
            let diametrosMayores = listaFiltrada.filter(tamiz => formValues[tamiz.id] > diametro);
            if (diametrosMenores.length > 0 && diametrosMayores.length > 0) {
                let valorFinal = Math.pow(10, ((diametro - porcentajesCorreccion[diametrosMenores[0].id]) / (porcentajesCorreccion[diametrosMayores.at(-1).id] - porcentajesCorreccion[diametrosMenores[0].id])) * Math.log10(diametrosMayores.at(-1).granulometria / diametrosMenores[0].granulometria) + Math.log10(diametrosMenores[0].granulometria));
                return valorFinal;
            }
        }
        setDiametro10(buscarDiametro(10));
        setDiametro30(buscarDiametro(30));
        setDiametro60(buscarDiametro(60));
        if (diametro10 && diametro30 && diametro60) {
            setCoeficienteUniformidad(diametro60 / diametro10);
            setCoeficienteCurvatura(Math.pow(diametro30, 2) / (diametro10 * diametro60));
        }
        setLimiteLiquido(parseFloat(formValues.limiteLiquido));
        setLimitePlastico(parseFloat(formValues.limitePlastico));
        // Verificacion de limite liquido y limite plastico
        if (formValues.limiteLiquido && formValues.limitePlastico) {

            if ((limiteLiquido - limitePlastico) < (0.73 * (limiteLiquido - 20))) {
                setLineaA('debajo');
            } else {
                setLineaA('encima');
            }

        }




        // Condiciones para denominacion final

        if (grava && arena) {
            if (grava + arena > 50) {
                if (grava < arena) {
                    if (grava + arena > 95) {
                        if (coeficienteUniformidad >= 6 && coeficienteCurvatura >= 1 && coeficienteCurvatura <= 3) {
                            if (grava >= 15) {
                                setDenominacionFinal('ARENA BIEN GRADUADA CON GRAVA (SW)');
                            } else {
                                setDenominacionFinal('ARENA BIEN GRADUADA (SW)');
                            }
                        } else {
                            if (grava >= 15) {
                                setDenominacionFinal('ARENA MAL GRADUADA CON GRAVA (SP)');
                            } else {
                                setDenominacionFinal('ARENA MAL GRADUADA (SP)');
                            }
                        }
                    } else if ((grava + arena < 95) && (grava + arena > 88)) {
                        if (coeficienteUniformidad >= 6 && coeficienteCurvatura >= 1 && coeficienteCurvatura <= 3) {
                            if (lineaA === 'debajo') {
                                if (grava >= 15) {
                                    setDenominacionFinal('ARENA BIEN GRADUADA CON LIMO Y GRAVA (SW-SM)');
                                } else {
                                    setDenominacionFinal('ARENA BIEN GRADUADA CON LIMO (SW-SM)');
                                }
                            } else {
                                if (grava >= 15) {
                                    setDenominacionFinal('ARENA BIEN GRADUADA CON ARCILLA Y GRAVA (SW-SC)');
                                } else {
                                    setDenominacionFinal('ARENA BIEN GRADUADA CON ARCILLA (SW-SC)');
                                }
                            }
                        } else {
                            if (lineaA === 'debajo') {
                                if (grava >= 15) {
                                    setDenominacionFinal('ARENA MAL GRADUADA CON LIMO Y GRAVA (SP-SM)');
                                } else {
                                    setDenominacionFinal('ARENA MAL GRADUADA CON LIMO (SP-SM)');
                                }
                            } else {
                                if (grava >= 15) {
                                    setDenominacionFinal('ARENA MAL GRADUADA CON ARCILLA Y GRAVA (SP-SC)');
                                } else {
                                    setDenominacionFinal('ARENA MAL GRADUADA CON ARCILLA (SP-SC)');
                                }
                            }
                        }
                    } else {
                        if (lineaA === 'debajo') {
                            if (grava >= 15) {
                                setDenominacionFinal('ARENA LIMOSA CON GRAVA (SM)');
                            } else {
                                setDenominacionFinal('ARENA LIMOSA (SM)');
                            }
                        } else {
                            if (grava >= 15) {
                                setDenominacionFinal('ARENA ARCILLOSA CON GRAVA (SC)');
                            } else {
                                setDenominacionFinal('ARENA ARCILLOSA (SC)');
                            }
                        }
                    }
                } else {
                    if (grava + arena > 95) {
                        if (coeficienteUniformidad >= 4 && coeficienteCurvatura >= 1 && coeficienteCurvatura <= 3) {
                            if (arena >= 15) {
                                setDenominacionFinal('GRAVA BIEN GRADUADA CON ARENA (GW)');
                            } else {
                                setDenominacionFinal('GRAVA BIEN GRADUADA (GW)');
                            }
                        } else {
                            if (arena >= 15) {
                                setDenominacionFinal('GRAVA MAL GRADUADA CON ARENA (GP)');
                            } else {
                                setDenominacionFinal('GRAVA MAL GRADUADA (GP)');
                            }
                        }
                    } else if ((grava + arena < 95) && (grava + arena > 88)) {
                        if (coeficienteUniformidad >= 6 && coeficienteCurvatura >= 1 && coeficienteCurvatura <= 3) {
                            if (lineaA === 'debajo') {
                                if (arena >= 15) {
                                    setDenominacionFinal('GRAVA BIEN GRADUADA CON LIMO Y ARENA (GW-GM)');
                                } else {
                                    setDenominacionFinal('GRAVA BIEN GRADUADA CON LIMO (GW-GM)');
                                }
                            } else {
                                if (arena >= 15) {
                                    setDenominacionFinal('GRAVA BIEN GRADUADA CON ARCILLA Y ARENA (GW-GC)');
                                } else {
                                    setDenominacionFinal('GRAVA BIEN GRADUADA CON ARCILLA (GW-GC)');
                                }
                            }
                        } else {
                            if (lineaA === 'debajo') {
                                if (arena >= 15) {
                                    setDenominacionFinal('GRAVA MAL GRADUADA CON LIMO Y ARENA (GP-GM)');
                                } else {
                                    setDenominacionFinal('GRAVA MAL GRADUADA CON LIMO (GP-GM)');
                                }
                            } else {
                                if (arena >= 15) {
                                    setDenominacionFinal('GRAVA MAL GRADUADA CON ARCILLA Y ARENA (GP-GC)');
                                } else {
                                    setDenominacionFinal('GRAVA MAL GRADUADA CON ARCILLA (GP-GC)');
                                }
                            }
                        }
                    } else {
                        if (lineaA === 'debajo') {
                            if (arena >= 15) {
                                setDenominacionFinal('GRAVA LIMOSA CON ARENA (GM)');
                            } else {
                                setDenominacionFinal('GRAVA LIMOSA (GM)');
                            }
                        } else {
                            if (arena >= 15) {
                                setDenominacionFinal('GRAVA ARCILLOSA CON ARENA (GC)');
                            } else {
                                setDenominacionFinal('GRAVA ARCILLOSA (GC)');
                            }
                        }
                    }
                }
            } else {
                if (limiteLiquido >= 50) {
                    if (lineaA === 'debajo') {
                        if (grava + arena >= 30) {
                            if (arena >= grava) {
                                if (grava < 15) {
                                    setDenominacionFinal('LIMO DE ALTO LÍMITE LÍQUIDO ARENOSO (MH)');
                                } else {
                                    setDenominacionFinal('LIMO DE ALTO LÍMITE LÍQUIDO ARENOSO CON GRAVA (MH)');
                                }
                            } else {
                                if (arena < 15) {
                                    setDenominacionFinal('LIMO DE ALTO LÍMITE LÍQUIDO GRAVOSO (MH)');
                                } else {
                                    setDenominacionFinal('LIMO DE ALTO LÍMITE LÍQUIDO GRAVOSO CON ARENA (MH)');
                                }
                            }
                        } else {
                            if (grava + arena >= 15) {
                                if (arena >= grava) {
                                    setDenominacionFinal('LIMO DE ALTO LÍMITE LÍQUIDO CON ARENA (MH)');
                                } else {
                                    setDenominacionFinal('LIMO DE ALTO LÍMITE LÍQUIDO CON GRAVA (MH)');
                                }
                            } else {
                                setDenominacionFinal('LIMO DE ALTO LÍMITE LÍQUIDO (MH)');
                            }
                        }
                    } else {
                        if (grava + arena >= 30) {
                            if (arena >= grava) {
                                if (grava < 15) {
                                    setDenominacionFinal('ARCILLA DE ALTO LÍMITE LÍQUIDO ARENOSA (CH)');
                                } else {
                                    setDenominacionFinal('ARCILLA DE ALTO LÍMITE LÍQUIDO ARENOSA CON GRAVA (CH)');
                                }
                            } else {
                                if (arena < 15) {
                                    setDenominacionFinal('ARCILLA DE ALTO LÍMITE LÍQUIDO GRAVOSA (CH)');
                                } else {
                                    setDenominacionFinal('ARCILLA DE ALTO LÍMITE LÍQUIDO GRAVOSA CON ARENA (CH)');
                                }
                            }
                        } else {
                            if (grava + arena >= 15) {
                                if (arena >= grava) {
                                    setDenominacionFinal('ARCILLA DE ALTO LÍMITE LÍQUIDO CON ARENA (CH)');
                                } else {
                                    setDenominacionFinal('ARCILLA DE ALTO LÍMITE LÍQUIDO CON GRAVA (CH)');
                                }
                            } else {
                                setDenominacionFinal('ARCILLA DE ALTO LÍMITE LÍQUIDO (CH)');
                            }
                        }
                    }
                } else {
                    if (lineaA === 'encima' && (limiteLiquido - limitePlastico > 7)) {
                        if (grava + arena >= 30) {
                            if (arena >= grava) {
                                if (grava < 15) {
                                    setDenominacionFinal('ARCILLA DE BAJO LÍMITE LÍQUIDO ARENOSA (CL)');
                                } else {
                                    setDenominacionFinal('ARCILLA DE BAJO LÍMITE LÍQUIDO ARENOSA CON GRAVA (CL)');
                                }
                            } else {
                                if (arena < 15) {
                                    setDenominacionFinal('ARCILLA DE BAJO LÍMITE LÍQUIDO GRAVOSA (CL)');
                                } else {
                                    setDenominacionFinal('ARCILLA DE BAJO LÍMITE LÍQUIDO GRAVOSA CON ARENA (CL)');
                                }
                            }
                        } else {
                            if (grava + arena >= 15) {
                                if (arena >= grava) {
                                    setDenominacionFinal('ARCILLA DE BAJO LÍMITE LÍQUIDO CON ARENA (CL)');
                                } else {
                                    setDenominacionFinal('ARCILLA DE BAJO LÍMITE LÍQUIDO CON GRAVA (CL)');
                                }
                            } else {
                                setDenominacionFinal('ARCILLA DE BAJO LÍMITE LÍQUIDO (CL)');
                            }
                        }
                    } else if (lineaA === 'encima' && (limiteLiquido - limitePlastico <= 7) && (limiteLiquido - limitePlastico >= 4)) {
                        if (grava + arena >= 30) {
                            if (arena >= grava) {
                                if (grava < 15) {
                                    setDenominacionFinal('ARCILLA ARENOSA-LIMOSA (CL-ML)');
                                } else {
                                    setDenominacionFinal('ARCILLA ARENOSA-LIMOSA CON GRAVA (CL-ML)');
                                }
                            } else {
                                if (arena < 15) {
                                    setDenominacionFinal('ARCILLA GRAVOSA-LIMOSA (CL-ML)');
                                } else {
                                    setDenominacionFinal('ARCILLA GRAVOSA-LIMOSA CON ARENA (CL-ML)');
                                }
                            }
                        } else {
                            if (grava + arena >= 15) {
                                if (arena >= grava) {
                                    setDenominacionFinal('ARCILLA LIMOSA CON ARENA (CL-ML)');
                                } else {
                                    setDenominacionFinal('ARCILLA LIMOSA CON GRAVA (CL-ML)');
                                }
                            } else {
                                setDenominacionFinal('ARCILLA LIMOSA (CL-ML)');
                            }
                        }
                    } else {
                        if (grava + arena >= 30) {
                            if (arena >= grava) {
                                if (grava < 15) {
                                    setDenominacionFinal('LIMO DE BAJO LIMITE LIQUIDO ARENOSO (ML)');
                                } else {
                                    setDenominacionFinal('LIMO DE BAJO LIMITE LIQUIDO ARENOSO CON GRAVA (ML)');
                                }
                            } else {
                                if (arena < 15) {
                                    setDenominacionFinal('LIMO DE BAJO LIMITE LIQUIDO GRAVOSO (ML)');
                                } else {
                                    setDenominacionFinal('LIMO DE BAJO LIMITE LIQUIDO GRAVOSO CON ARENA (ML)');
                                }
                            }
                        } else {
                            if (grava + arena >= 15) {
                                if (arena >= grava) {
                                    setDenominacionFinal('LIMO DE BAJO LIMITE LIQUIDO CON ARENA (ML)');
                                } else {
                                    setDenominacionFinal('LIMO DE BAJO LIMITE LIQUIDO CON GRAVA (ML)');
                                }
                            } else {
                                setDenominacionFinal('LIMO DE BAJO LIMITE LIQUIDO (ML)');
                            }
                        }
                    }

                }
            }
        }

        // Denominación final AASHTO
        if (porcentajesCorreccion[15] <= 50 && porcentajesCorreccion[19] <= 30 && porcentajesCorreccion[22] <= 15 && limiteLiquido - limitePlastico <= 6) {
            setDenominacionAASHTO('Fragmentos de piedra, grava y arena A-1-a');
        } else if (porcentajesCorreccion[19] <= 50 && porcentajesCorreccion[22] <= 25) {
            setDenominacionAASHTO('Fragmentos de piedra, grava y arena A-1-b');
        } else if (porcentajesCorreccion[19] >= 50 && porcentajesCorreccion[22] <= 10) {
            setDenominacionAASHTO('Arena fina A-1-3');
        } else if (porcentajesCorreccion[22] <= 35 && limiteLiquido <= 40 && limiteLiquido - limitePlastico <= 10) {
            setDenominacionAASHTO('Grava limosa o arcillosa A-2-4');
        } else if (porcentajesCorreccion[22] <= 35 && limiteLiquido >= 41 && limiteLiquido - limitePlastico <= 10) {
            setDenominacionAASHTO('Grava limosa o arcillosa A-2-5');
        } else if (porcentajesCorreccion[22] <= 35 && limiteLiquido <= 40 && limiteLiquido - limitePlastico >= 11) {
            setDenominacionAASHTO('Arena limosa o arcillosa A-2-6');
        } else if (porcentajesCorreccion[22] <= 35 && limiteLiquido >= 41 && limiteLiquido - limitePlastico >= 11) {
            setDenominacionAASHTO('Arena limosa o arcillosa A-2-7');
        } else if (porcentajesCorreccion[22] >= 36 && limiteLiquido <= 40 && limiteLiquido - limitePlastico <= 10) {
            setDenominacionAASHTO('Suelo limoso A-4');
        } else if (porcentajesCorreccion[22] >= 36 && limiteLiquido >= 41 && limiteLiquido - limitePlastico <= 10) {
            setDenominacionAASHTO('Suelo limoso A-5');
        } else if (porcentajesCorreccion[22] >= 36 && limiteLiquido <= 40 && limiteLiquido - limitePlastico >= 11) {
            setDenominacionAASHTO('Suelo arcilloso A-6');
        } else if (porcentajesCorreccion[22] >= 36 && limiteLiquido >= 41 && limiteLiquido - limitePlastico >= 11 && limiteLiquido - limitePlastico <= limiteLiquido - 30) {
            setDenominacionAASHTO('Suelo arcilloso A-7-5');
        } else {
            setDenominacionAASHTO('Suelo arcilloso A-7-6');
        }

        if (denominacionAASHTO === 'Arena limosa o arcillosa A-2-6' || denominacionAASHTO === 'Arena limosa o arcillosa A-2-7') {
            setIndiceGrupo(0.01 * (porcentajesCorreccion[22] - 15) * (limiteLiquido - limitePlastico - 10));
        } else {
            setIndiceGrupo((porcentajesCorreccion[22] - 35) * (0.2 + 0.005 * (limiteLiquido - 40)) + 0.01 * (porcentajesCorreccion[22] - 15) * (limiteLiquido - limitePlastico - 10));
        }
        forceUpdate();
    }, [formValues, grava, arena, porcentajesCorreccion, diametro10, diametro30, diametro60, limiteLiquido, limitePlastico, denominacionAASHTO, coeficienteUniformidad, coeficienteCurvatura, lineaA])

    return <div className='container mt-5'>
        <h1> Unidad 2 - Clasificación de suelos SUCS y AASHTO </h1>
        <hr />
        <div className='row'>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><b>Instrucciones (leer) </b></Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>
                                Introducir primero límite líquido y límite plástico EN % si los hubiera, si no dejarlos vacíos. Recordar que si el suelo NO es plástico la parte fina es limo y si es plástico, es arcilla.
                            </li>
                            <li>
                                Salvo el tamiz de 3" que SIEMPRE debe tener un valor, NO introducir tamices que el enunciado no especifica. Dejarlos vacíos.
                            </li>
                            <li>
                                Si al introducir todos los tamices, en alguna fila aparece la leyenda 'NaN', es recomendable actualizar la página y volver a empezar.
                            </li>
                            <li>
                                <b>IMPORTANTE:</b> Una vez cargados todos los tamices, cambiar un 1% el porcentaje del tamiz con mayor abertura para que se confirmen los valores introducidos. Es probable que el tipo de suelo cambie, en este caso el último tipo de suelo desplegado es el correcto.
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='espacio'></div>
        </div>

        <div className='row'>
            <div className='col-md-9'>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Tamiz</th>
                            <th>Abertura en mm</th>
                            <th>% que pasa</th>
                            <th>% retenido</th>
                            <th>Corrección de % que pasa</th>
                            <th>Corrección de % retenido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaTamices.map(tamiz => (
                            <tr key={tamiz.id}>
                                <td>{tamiz.nombre}</td>
                                <td>{tamiz.granulometria}</td>
                                <td>
                                    <input
                                        type="number"
                                        max="100"
                                        min="0"
                                        className={'form-control' + (formValues[tamiz.id] !== undefined ? ' test' : '')}
                                        id="exampleFormControlInput1"
                                        placeholder={tamiz.nombre}
                                        name={tamiz.id}
                                        value={formValues[tamiz.id]}
                                        onChange={handleInputChange} />
                                </td>
                                <td>
                                    {porcentajesPasan[tamiz.id] && 100 - porcentajesPasan[tamiz.id]}
                                </td>
                                <td>
                                    {porcentajesCorreccion[tamiz.id] && porcentajesCorreccion[tamiz.id].toFixed(2)}
                                </td>
                                <td>
                                    {porcentajesCorreccion[tamiz.id] && (100 - porcentajesCorreccion[tamiz.id]).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className='col-md-3'>
                <input
                    type="number"
                    max="100"
                    min="0"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder='Limite Liquido'
                    name='limiteLiquido'
                    value={formValues[limiteLiquido]}
                    onChange={handleInputChange} />
                <input
                    type="number"
                    max="100"
                    min="0"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder='Limite Plastico'
                    name='limitePlastico'
                    value={formValues[limitePlastico]}
                    onChange={handleInputChange} />
                <div className='espacio'></div>
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Tipo de suelo</td>
                            <td>{(grava + arena > 50) ? 'Grueso' : 'Fino'}</td>
                        </tr>
                        <tr>
                            <td>% Grava</td>
                            <td>{Math.round(grava)}</td>
                        </tr>
                        <tr>
                            <td>% Arena</td>
                            <td>{Math.round(arena)}</td>
                        </tr>
                        <tr>
                            <td>Cu</td>
                            <td>{coeficienteUniformidad ? Math.round(coeficienteUniformidad) : ''}</td>
                        </tr>
                        <tr>
                            <td>Cc</td>
                            <td>{coeficienteCurvatura ? Math.round(coeficienteCurvatura) : ''}</td>
                        </tr>
                        <tr>
                            <td>Linea A</td>
                            <td>{lineaA ? lineaA : ''}</td>
                        </tr>
                        <tr>
                            <td>Limite Liquido</td>
                            <td>{limiteLiquido ? (limiteLiquido > 50 ? 'Alto' : 'Bajo') : ''}</td>
                        </tr>
                    </tbody>
                </Table>
                <div className='espacio'></div>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>{denominacionFinal}</h5>
                    </div>
                </div>
                <div className='espacio'></div>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>{denominacionAASHTO}</h5>
                    </div>
                </div>
                <div className='espacio'></div>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>Índice Grupo: {(indiceGrupo && indiceGrupo > 0) ? Math.round(indiceGrupo) : ''}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};