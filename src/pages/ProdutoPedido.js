import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import api from '../services/api';
import { useEffect } from 'react';

export default function ProdutoPedido() {
  const [produto_pedido, setProdutoPedido] = useState([])

  useEffect(() => {
    api.get('/produto_pedido').then(response => {
      setProdutoPedido(response.data)
    })
  }, [])

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Produto</th>
          <th>Pedido</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {
          produto_pedido.map((produto_pedido, index) => {  
            return (
              <tr key={index}>
                <td>{produto_pedido.qtd_produto_pedido}</td>
                <td>{produto_pedido.preco_produto_pedido}</td>
                <td>{produto_pedido.produto_id}</td>
                <td>{produto_pedido.pedido_id}</td>
                <td>Atualizar | Excluir</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}
