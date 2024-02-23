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

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [clienteParaExcluir, setClienteParaExcluir] = useState(null);
  const [formulario, setFormulario] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    telefone: '',
    dataNascimento: '',
    endereco: '',
  });

  useEffect(() => {
    api.get('/clientes').then(response => {
      setClientes(response.data)
    })
  }, [])

  const handleExcluir = async (cliente_id) => {
    try {
      await api.delete(`/clientes/${cliente_id}`)
      setClientes(clientes.filter(cliente => cliente.cliente_id !== cliente_id))
      setClienteParaExcluir(null);
    } catch (error) {
      console.log(error)
    }
  }

  const mostrarModalConfirmacao = (cliente) => {
    setClienteParaExcluir(cliente);
  };

  const confirmarExclusao = () => {
    setClienteParaExcluir(null);
  };

  const cancelarExclusao = () => {
    setClienteParaExcluir(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post('/clientes', formulario);
      const response = await api.get('/clientes');
      setClientes(response.data);

      setFormulario({
        nome: '',
        cpf: '',
        email: '',
        senha: '',
        telefone: '',
        dataNascimento: '',
        endereco: '',
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <>
     <Form onSubmit={handleSubmit}>
      <h3>Cadastro</h3>
      <Container>
        <Row>
          <Col>
            <Form.Group controlId="formBasicName">
              <FloatingLabel
                controlId='floatingInputName'
                label='Nome'
                className='sm-3'>
                  <Form.Control type="name" placeholder="Nome" />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicCPF">
              <FloatingLabel
                  controlId='floatingInputCPF'
                  label='CPF'
                  className='sm-3'>
                  <Form.Control type="text" placeholder="CPF" />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <FloatingLabel
                  controlId='floatingInputEmail'
                  label='Email'
                  className='sm-3'>
                  <Form.Control type="email" placeholder="Email" />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicPassword">
              <FloatingLabel
                  controlId='floatingInputPassword'
                  label='Senha'
                  className='sm-3'>
                  <Form.Control type="password" placeholder="Senha" />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="formBasicPhone">
              <FloatingLabel
                  controlId='floatingInputPhone'
                  label='Telefone'
                  className='sm-3'>
                  <Form.Control type="phone" placeholder="Telefone" />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicBirth">
              <FloatingLabel
                  controlId='floatingInputBirth'
                  label='Data de Nascimento'
                  className='sm-3'>
                  <Form.Control type="date" placeholder="Data de Nascimento" />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="formBasicAddress">
              <FloatingLabel
                  controlId='floatingInputAddress'
                  label='Endereço'
                  className='sm-3'>
                  <Form.Control type="address" placeholder="Endereço" />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
      </Container>
     

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Email</th>
          <th>Senha</th>
          <th>Telefone</th>
          <th>Data de Nascimento</th>
          <th>Endereço</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {
          clientes.map((cliente, index) => {
            return (
              <tr key={index}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.email}</td>
                <td>{cliente.senha}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.data_nascimento}</td>
                <td>{cliente.endereco_id}</td>
                <td>
                  Atualizar |
                  <Button variant="danger" onClick={() => mostrarModalConfirmacao(cliente)}>Excluir</Button></td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>

    <Modal show={!!clienteParaExcluir} onHide={cancelarExclusao}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o cliente {clienteParaExcluir?.nome}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarExclusao}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => { confirmarExclusao(); 
            handleExcluir(clienteParaExcluir?.cliente_id);}}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
