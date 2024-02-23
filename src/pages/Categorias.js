import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import api from '../services/api';
import { useEffect } from 'react';

export default function Categorias() {
  const [categoria, setCategoria] = useState([])

  useEffect(() => {
    api.get('/categorias').then(response => {
      setCategoria(response.data)
    })
  }, [])

  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Descrição</th>
        <th>Opções</th>
      </tr>
    </thead>
    <tbody>
      {
        categoria.map((categoria, index) => {
          return (
            <tr key={index}>
              <td>{categoria.nome_categoria}</td>
              <td>{categoria.descricao_categoria}</td>
              <td>Atualizar | Excluir</td>
            </tr>
          )
        })
      }
    </tbody>
  </Table>
  )
}

