import React from 'react';
import { useForm2 } from '../hooks/useForm2';

export const LimiteListItem = ({ limite, index, handleDelete, handleToggle }) => {

    const [{ numeroLimites, pesoSueloHumedo, pesoSueloSeco, pesoPesafiltro }, handleInputChange, reset] = useForm2();

    const handleSubmit = (e) => {

        const newLimite = {
            id: limite.id,
            numLimites: numeroLimites,
            psh: pesoSueloHumedo,
            pss: pesoSueloSeco,
            pf: pesoPesafiltro
        };

        const action = {
            type: 'add',
            payload: newLimite
        }

        // handleAddLimite(newLimite);
        reset();
    }

    return <tr key={limite.id}>
        <td>
            <input
                type="number"
                max="100"
                min="0"
                className={'form-control' + (pesoSueloHumedo !== undefined ? ' test' : '')}
                id="exampleFormControlInput1"
                name={pesoSueloHumedo}
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
                name={pesoSueloSeco}
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
                name={pesoPesafiltro}
                value={pesoPesafiltro}
                onChange={handleInputChange} />
        </td>
        <td>
            <p className={`${limite.done && 'complete'}`}
                onClick={() => handleToggle(limite.id)}>{index + 1}.{limite.desc}</p>
        </td>
        <td>
            <button
                className='btn btn-danger'
                onClick={() => handleDelete(limite.id)}> Borrar </button>
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
