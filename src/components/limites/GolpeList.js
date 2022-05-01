import React from 'react';
import { Table } from 'react-bootstrap';
import { GolpeListItem } from './GolpeListItem';

export const GolpeList = ({ golpes, handleDelete, handleToggle, handleCuenta }) => {

  return <div>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>N°Golpes</th>
          <th>Peso de suelo húmedo (Psh/+ Pf)</th>
          <th>Peso de suelo seco (Pss/+ Pf)</th>
          <th>Peso de pesafiltro (Pf)</th>
          <th>% Humedad (&omega;)</th>
          <th>% Limite Liquido</th>
          <th> Borrar </th>
        </tr>
      </thead>
      <tbody>
        {
          golpes.map((golpe, i) => (
            <GolpeListItem
              golpe={golpe}
              index={i}
              key={golpe.id}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
              handleCuenta={handleCuenta} />
          ))
        }
      </tbody>
    </Table>


  </div>;
};
