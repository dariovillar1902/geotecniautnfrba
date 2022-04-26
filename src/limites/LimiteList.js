import React from 'react';
import { Table } from 'react-bootstrap';
import { LimiteListItem } from './LimiteListItem';

export const LimiteList = ({ limites, handleDelete, handleToggle }) => {

  return <div>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Peso de suelo húmedo (Psh/+ Pf)</th>
          <th>Peso de suelo seco (Pss/+ Pf)</th>
          <th>Peso de pesafiltro (Pf)</th>
          <th>% Humedad (&omega;)</th>
          <th> Borrar </th>
        </tr>
      </thead>
      <tbody>
        {
          limites.map((limite, i) => (
            <LimiteListItem
              limite={limite}
              index={i}
              key={limite.id}
              handleDelete={handleDelete}
              handleToggle={handleToggle} />
          ))
        }
      </tbody>
    </Table>


  </div>;
};
