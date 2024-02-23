import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import api from '../services/api';
import { useEffect } from 'react';

export default function Produtos() {
  const [produtos, setProdutos] = useState([])

  useEffect(() => { 
    api.get('/produtos').then(response => {
      setProdutos(response.data)
    })
  }, [])

  return(
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>Qtd. Estoque</th>
          <th>Data de Cadastro</th>
          <th>Categoria</th>
          <th>Imagem</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
          {
            produtos.map((produto, index) => {
              return (
                <tr key={index}>
                  <td>{produto.nome_produto}</td>
                  <td>{produto.descricao_produto}</td>
                  <td>{produto.preco_produto}</td>
                  <td>{produto.qtd_estoque}</td>
                  <td>{produto.data_cadastro_produto}</td>
                  <td>{produto.categoria_id}</td>
                  <td>{produto.imagem}</td>
                  <td>Atualizar | Excluir</td>
                </tr>
              )
            })
          }
      </tbody>
    </Table>
  )
}
