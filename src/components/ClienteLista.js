import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const ClientList = ({ onEditClick, onDeleteClick }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('/clients')
      .then(response => setClients(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Clientes</h2>
      <ul>
        {clients.map(client => (
          <li key={client.cliente_id}>
            <strong>{client.nome}</strong> - {client.email}
            <button onClick={() => onEditClick(client)}>Editar</button>
            <button onClick={() => onDeleteClick(client.cliente_id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;