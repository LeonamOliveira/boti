import React, { useState } from 'react';
import { useEffect } from 'react';
import api from '../services/api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { MdModeEdit, MdDeleteOutline  } from "react-icons/md";

export default function ProdutoPedido() {
  const [produto_pedido, setProdutoPedido] = useState([])
  const [produtoPedidoParaExcluir, setProdutoPedidoParaExcluir] = useState(null);
  const [produtoPedidoParaEditar, setProdutoPedidoParaEditar] = useState(null); // Novo estado para edição

  const [formulario, setFormulario] = useState({
    qtd_produto_pedido: '',
    preco_produto_pedido: '',
    produto_id: '',
    pedido_id: '',
  });

  const [showModalEdicao, setShowModalEdicao] = useState(false);

  const handleEditar = (produto_pedido) => {
    setProdutoPedidoParaEditar(produto_pedido);
    setFormulario({
      qtd_produto_pedido: produto_pedido.qtd_produto_pedido,
      preco_produto_pedido: produto_pedido.preco_produto_pedido,
      produto_id: produto_pedido.produto_id,
      pedido_id: produto_pedido.pedido_id,
    });
    setShowModalEdicao(true);
  };

  const cancelarEdicao = () => {
    setShowModalEdicao(false);
    setProdutoPedidoParaEditar(null);
    setFormulario({
      qtd_produto_pedido: '',
      preco_produto_pedido: '',
      produto_id: '',
      pedido_id: '',
    });
  };



  const handleSubmitEdicao = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/produto_pedido/${produtoPedidoParaEditar.produto_pedido_id}`, formulario);
      const updatedProdutoPedido = produto_pedido.map((item) =>
        item.produto_pedido_id === produtoPedidoParaEditar.produto_pedido_id ? formulario : item
      );
      setProdutoPedido(updatedProdutoPedido);
      setShowModalEdicao(false);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    api.get('/produto_pedido').then(response => {
      setProdutoPedido(response.data)
    })
  }, [])

  const handleExcluir = async (produto_pedido_id) => {
    try {
      await api.delete(`/produto_pedido/${produto_pedido_id}`)
      setProdutoPedido(produto_pedido.filter(produto_pedido => produto_pedido.produto_pedido_id !== produto_pedido_id))
      setProdutoPedidoParaExcluir(null);
    } catch (error) {
      console.log(error)
    }
  }

  const mostrarModalConfirmacao = (produto_pedido) => {
    setProdutoPedidoParaExcluir(produto_pedido);
  }
  
  const confirmarExclusao = () => {
    setProdutoPedidoParaExcluir(null);
  }

  const cancelarExclusao = () => {
    setProdutoPedidoParaExcluir(null);
  }

  const handleChange = (event, field) => {
    setFormulario((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/produto_pedido', formulario);
      setProdutoPedido([...produto_pedido, formulario]);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Cadastro de Produtos Pedidos</h3>
        <Container>
          <Row>
            <Col>
              <Form.Group controlId='formBasicQtdProdutoPedido'>
                <FloatingLabel
                  controlId='floatingInputQtdProdutoPedido'
                  label='Quantidade do Produto Pedido'
                  className='sm-3'>
                  <Form.Control
                    type='number'
                    placeholder='Quantidade do Produto Pedido'
                    onChange={(event) => handleChange(event, 'qtd_produto_pedido')} />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='formBasicPrecoProdutoPedido'>
                <FloatingLabel
                  controlId='floatingInputPrecoProdutoPedido'
                  label='Preço do Produto Pedido'
                  className='sm-3'>
                  <Form.Control
                    type='number'
                    placeholder='Preço do Produto Pedido'
                    onChange={(event) => handleChange(event, 'preco_produto_pedido')} />
                </FloatingLabel>
              </Form.Group> 
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId='formBasicProdutoId'>
                <FloatingLabel
                  controlId='floatingInputProdutoId'
                  label='Produto'
                  className='sm-3'>
                  <Form.Control
                    type='number'
                    placeholder='Produto'
                    onChange={(event) => handleChange(event, 'produto_id')} />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='formBasicPedidoId'>
                <FloatingLabel
                  controlId='floatingInputPedidoId'
                  label='Pedido'
                  className='sm-3'>
                  <Form.Control
                    type='number'
                    placeholder='Pedido'
                    onChange={(event) => handleChange(event, 'pedido_id')} />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs lg="2" style={{marginTop:10, marginBottom:10}}>
              <Button  size="sm" variant="success" type="submit">
                Cadastrar
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
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
                  <td>
                    <Button variant="primary" onClick={() => handleEditar(produto_pedido)}>
                      <MdModeEdit />
                    </Button>
                    <Button variant="danger" onClick={() => mostrarModalConfirmacao(produto_pedido)}>
                      <MdDeleteOutline />
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>

      <Modal show={showModalEdicao} onHide={cancelarEdicao}>
        <Modal.Header closeButton>
          <Modal.Title>Edição de Produto Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdicao}>
          <Form.Group controlId='formBasicQtdProdutoPedido'>
              <FloatingLabel
                controlId='floatingInputQtdProdutoPedido'
                label='Quantidade do Produto Pedido'
                className='sm-3'>
                <Form.Control
                  type='number'
                  placeholder='Quantidade do Produto Pedido'
                  onChange={(event) => setFormulario({ ...formulario, qtd_produto_pedido: event.target.value })}
                  value={formulario.qtd_produto_pedido}
                />
              </FloatingLabel>
            </Form.Group>
            
            <Form.Group controlId='formBasicPrecoProdutoPedido'>
              <FloatingLabel
                controlId='floatingInputPrecoProdutoPedido'
                label='Preço do Produto Pedido'
                className='sm-3'>
                <Form.Control
                  type='number'
                  placeholder='Preço do Produto Pedido'
                  onChange={(event) => setFormulario({ ...formulario, preco_produto_pedido: event.target.value })}
                  value={formulario.preco_produto_pedido}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId='formBasicProdutoId'>
              <FloatingLabel
                controlId='floatingInputProdutoId'
                label='Produto'
                className='sm-3'>
                <Form.Control
                  type='number'
                  placeholder='Produto'
                  onChange={(event) => setFormulario({ ...formulario, produto_id: event.target.value })}
                  value={formulario.produto_id}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId='formBasicPedidoId'>
              <FloatingLabel
                controlId='floatingInputPedidoId'
                label='Pedido'
                className='sm-3'>
                <Form.Control
                  type='number'
                  placeholder='Pedido'
                  onChange={(event) => setFormulario({ ...formulario, pedido_id: event.target.value })}
                  value={formulario.pedido_id}
                />
              </FloatingLabel>
            </Form.Group>
            <Button variant="secondary" onClick={cancelarEdicao}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar Alterações
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={!!produtoPedidoParaExcluir} onHide={cancelarExclusao}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o produto pedido {produtoPedidoParaExcluir?.produto_id}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarExclusao}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => { confirmarExclusao(); 
            handleExcluir(produtoPedidoParaExcluir?.produto_pedido_id);}}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
