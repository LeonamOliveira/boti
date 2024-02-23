import React, { useState, useEffect } from 'react';
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

export default function Pedidos() {    
  const [pedidos, setPedidos] = useState([])
  const [pedidoParaExcluir, setPedidoParaExcluir] = useState(null);
  const [pedidoPedidoParaEditar, setPedidoPedidoParaEditar] = useState(null);
  const [showModalEdicao, setShowModalEdicao] = useState(false);

  const [formulario, setFormulario] = useState({
    numero_pedido: '',
    valor_total_pedido: '',
    data_pedido: '',
    status: '',
    cliente_id: '',
  });
  useEffect(() => { 
    api.get('/pedidos').then(response => {
      setPedidos(response.data)
    })
  }, [])

  const handleExcluir = async (pedido_id) => {
    try {
      await api.delete(`/pedidos/${pedido_id}`)
      setPedidos(pedidos.filter(pedido => pedido.pedido_id !== pedido_id))
      setPedidoParaExcluir(null);
    } catch (error) {
      console.log(error)
    }
  }

  const mostrarModalConfirmacao = (pedido) => {
    setPedidoParaExcluir(pedido);
  };

  const confirmarExclusao = () => {
    setPedidoParaExcluir(null);
  };

  const cancelarExclusao = () => {
    setPedidoParaExcluir(null);
  };

  const handleChange = (event, field) => {
    setFormulario(prevState => ({
      ...prevState,
      [field]: event.target.value
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/pedidos', formulario);
      const response = await api.get('/pedidos');
      setPedidos(response.data);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  const mostrarModalEdicao = (pedido) => {
    setPedidoPedidoParaEditar(pedido);
    setShowModalEdicao(true);
  };

  const cancelarEdicao = () => {
    setPedidoPedidoParaEditar(null);
    setShowModalEdicao(false);
  };

  const handleSubmitEdicao = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/pedidos/${formulario.pedido_id}`, formulario);
      const response = await api.get('/pedidos');
      setPedidos(response.data);
      setShowModalEdicao(false);
    } catch (error) {
      console.error('Erro ao enviar formulário de edição:', error);
    }
  };

  const handleEditar = (pedido) => {
    setPedidoPedidoParaEditar(pedido);
    setFormulario({
      pedido_id: pedido.pedido_id,
      numero_pedido: pedido.numero_pedido,
      valor_total_pedido: pedido.valor_total_pedido,
      data_pedido: pedido.data_pedido,
      status: pedido.status,
      cliente_id: pedido.cliente_id,
    });
    setShowModalEdicao(true);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Cadastro de Pedido</h3>
        <Container>
          <Row>
            <Col>
              <Form.Group controlId='formBasicNumeroDoPedido'>
                <FloatingLabel controlId="floatingInput" label="Número do Pedido">
                  <Form.Control type="number" placeholder="Número do Pedido" onChange={(e) => handleChange(e, "numero_pedido")} />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='formBasicValorTotal'>
                <FloatingLabel controlId="floatingInput" label="Valor Total">
                  <Form.Control type="number" placeholder="Valor Total" onChange={(e) => handleChange(e, "valor_total_pedido")}/>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId='formBasicDataDoPedido'>
                <FloatingLabel controlId="floatingInput" label="Data do Pedido">
                  <Form.Control type="date" placeholder="Data do Pedido" onChange={(e) => handleChange(e, "data_pedido")} />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='formBasicStatus'>
                <FloatingLabel controlId="floatingInput" label="Status">
                  <Form.Control type="text" placeholder="Status" onChange={(e) => handleChange(e, "status")}/>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId='formBasicCliente'>
                <FloatingLabel controlId="floatingInput" label="Cliente">
                  <Form.Control type="text" placeholder="Cliente" onChange={(e) => handleChange(e, "cliente_id")} />
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
                  <td>
                    <Button variant="primary" onClick={() => handleEditar(pedido)}>
                      <MdModeEdit />
                    </Button>
                    <Button variant="danger" onClick={() => mostrarModalConfirmacao(pedido)}><MdDeleteOutline /></Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>

      <Modal show={showModalEdicao} onHide={cancelarEdicao}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdicao}>
            <Container>
              <Row>
                <Col>
                  <Form.Group controlId='formBasicNumeroDoPedido'>
                    <FloatingLabel controlId="floatingInput" label="Número do Pedido">
                      <Form.Control
                        type="number"
                        placeholder="Número do Pedido"
                        value={formulario.numero_pedido}
                        onChange={(e) => handleChange(e, 'numero_pedido')}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='formBasicValorTotal'>
                    <FloatingLabel controlId="floatingInput" label="Valor Total">
                      <Form.Control
                        type="number"
                        placeholder="Valor Total"
                        value={formulario.valor_total_pedido}
                        onChange={(e) => handleChange(e, 'valor_total_pedido')}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId='formBasicDataDoPedido'>
                    <FloatingLabel controlId="floatingInput" label="Data do Pedido">
                      <Form.Control
                        type="date"
                        placeholder="Data do Pedido"
                        value={formulario.data_pedido}
                        onChange={(e) => handleChange(e, 'data_pedido')}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='formBasicStatus'>
                    <FloatingLabel controlId="floatingInput" label="Status">
                      <Form.Control
                        type="text"
                        placeholder="Status"
                        value={formulario.status}
                        onChange={(e) => handleChange(e, 'status')}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId='formBasicCliente'>
                    <FloatingLabel controlId="floatingInput" label="Cliente">
                      <Form.Control
                        type="text"
                        placeholder="Cliente"
                        value={formulario.cliente_id}
                        onChange={(e) => handleChange(e, 'cliente_id')}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs lg="2" style={{ marginTop: 10, marginBottom: 10 }}>
                  <Button size="sm" variant="success" type="submit">
                    Salvar
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={!!pedidoParaExcluir} onHide={cancelarExclusao}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o pedido {pedidoParaExcluir?.numero_pedido}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarExclusao}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => { confirmarExclusao(); 
            handleExcluir(pedidoParaExcluir?.pedido_id);}}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
