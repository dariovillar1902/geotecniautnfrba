import React from 'react';
import { useForm2 } from '../hooks/useForm2';

export const GolpeListItem = ({ golpe, index, handleDelete, handleToggle }) => {

    const [{ numeroGolpes, pesoSueloHumedo, pesoSueloSeco, pesoPesafiltro }, handleInputChange, reset] = useForm2();

    const handleSubmit = (e) => {

        const newGolpe = {
            id: golpe.id,
            numGolpes: numeroGolpes,
            psh: pesoSueloHumedo,
            pss: pesoSueloSeco,
            pf: pesoPesafiltro
        };

        const action = {
            type: 'add',
            payload: newGolpe
        }

        // handleAddGolpe(newGolpe);
        reset();
    }

    return <tr key={golpe.id}>
        <td>
            <input
                type="number"
                max="100"
                min="0"
                className={'form-control' + (numeroGolpes !== undefined ? ' test' : '')}
                id="exampleFormControlInput1"
                name={numeroGolpes}
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
            <p className={`${golpe.done && 'complete'}`}
                onClick={() => handleToggle(golpe.id)}>{index + 1}.{golpe.desc}</p>
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
