import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import api from '../services/api';
import { useEffect } from 'react';

export default function Enderecos() {
 const [enderecos, setEnderecos] = useState([])
 
  useEffect(() => {
    api.get('/enderecos').then(response => {
      setEnderecos(response.data)
    })
  }, [])

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>CEP</th>
          <th>Bairro</th>
          <th>Cidade</th>
          <th>Número</th>
          <th>Complemento</th>
          <th>UF</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {
          enderecos.map((endereco, index) => {
            return (
              <tr key={index}>
                <td>{endereco.cep}</td>
                <td>{endereco.bairro}</td>
                <td>{endereco.cidade}</td>
                <td>{endereco.numero}</td>
                <td>{endereco.complemento}</td>
                <td>{endereco.uf}</td>
                <td>Atualizar | Excluir</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}
