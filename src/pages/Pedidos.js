import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import api from '../services/api';
import { useEffect } from 'react';

export default function Pedidos() {    
  const [pedidos, setPedidos] = useState([])

  useEffect(() => { 
    api.get('/pedidos').then(response => {
      setPedidos(response.data)
    })
  }, [])

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Número do Pedido</th>
          <th>Valor Total</th>
          <th>Data do Pedido</th>
          <th>Status</th>
          <th>Cliente</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {
          pedidos.map((pedido, index) => {
            return(
              <tr key={index}>
                <td>{pedido.numero_pedido}</td>
                <td>{pedido.valor_total_pedido}</td>
                <td>{pedido.data_pedido}</td>
                <td>{pedido.status}</td>
                <td>{pedido.cliente_id}</td>
                <td>Atualizar | Excluir</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}
