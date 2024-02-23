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
import './pages.css';

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [clienteParaExcluir, setClienteParaExcluir] = useState(null);
  const [clienteParaEditar, setClienteParaEditar] = useState(null);
  const [showModalEdicao, setShowModalEdicao] = useState(false);

  const [formulario, setFormulario] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    data_nascimento: '',
    endereco_id: '',
    username: '',
    senha: '',
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

  const handleEditar = (cliente) => {
    setClienteParaEditar(cliente);
    setFormulario({
      nome: cliente.nome,
      cpf: cliente.cpf,
      email: cliente.email,
      telefone: cliente.telefone,
      data_nascimento: cliente.data_nascimento,
      endereco_id: cliente.endereco_id,
      username: cliente.username,
      senha: cliente.senha,
    });
    setShowModalEdicao(true);
  };

  const handleSubmitEdicao = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/clientes/${clienteParaEditar.cliente_id}`, formulario);
      const updatedClientes = clientes.map((item) =>
        item.cliente_id === clienteParaEditar.cliente_id ? formulario : item
      );
      setClientes(updatedClientes);
      setShowModalEdicao(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelarEdicao = () => {
    setShowModalEdicao(false);
    setClienteParaEditar(null);
    setFormulario({
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      data_nascimento: '',
      endereco_id: '',
      username: '',
      senha: '',
    });
  };

  const handleChange = (event, field)=>{
    setFormulario({
      ...formulario,
      [field]: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/clientes', formulario);
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <>
     <Form onSubmit={handleSubmit}>
      <Container style={{padding:20, borderRadius:5}}>
        <h3>Cadastro de Clientes</h3>
        <Row>
          <Col>
            <Form.Group controlId="formBasicName">
              <FloatingLabel
                controlId='floatingInputName'
                label='Nome'
                className='sm-3'>
                  <Form.Control type="name" placeholder="Nome" onChange={(e)=>handleChange(e,"nome")}/>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicCPF">
              <FloatingLabel
                  controlId='floatingInputCPF'
                  label='CPF'
                  className='sm-3'>
                  <Form.Control type="text" placeholder="CPF" onChange={(e)=>handleChange(e,"cpf")}/>
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
                  <Form.Control type="email" placeholder="Email" onChange={(e)=>handleChange(e,"email")}/>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicPassword">
              <FloatingLabel
                  controlId='floatingInputPassword'
                  label='Senha'
                  className='sm-3'>
                  <Form.Control type="password" placeholder="Senha" onChange={(e)=>handleChange(e,"senha")}/>
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
                  <Form.Control type="phone" placeholder="Telefone" onChange={(e)=>handleChange(e,"telefone")}/>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicBirth">
              <FloatingLabel
                  controlId='floatingInputBirth'
                  label='Data de Nascimento'
                  className='sm-3'>
                  <Form.Control type="date" placeholder="Data de Nascimento" onChange={(e)=>handleChange(e,"data_nascimento")}/>
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
                  <Form.Control type="address" placeholder="Endereço" onChange={(e)=>handleChange(e,"endereco_id")}/>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicUsername">
              <FloatingLabel
                  controlId='floatingInputUsername'
                  label='Username'
                  className='sm-3'>
                  <Form.Control type="text" placeholder="Username" onChange={(e)=>handleChange(e,"username")}/>
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

    <Modal show={showModalEdicao} onHide={cancelarEdicao}>
        <Modal.Header closeButton>
          <Modal.Title>Edição de Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-container" onSubmit={handleSubmitEdicao}>
          <Row>
              <Col>
                <Form.Group controlId="formBasicName">
                  <FloatingLabel
                    controlId='floatingInputName'
                    label='Nome'
                    className='sm-3'>
                    <Form.Control
                      type="name"
                      placeholder="Nome"
                      value={formulario.nome}
                      onChange={(e) => handleChange(e, "nome")}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicCPF">
                  <FloatingLabel
                    controlId='floatingInputCPF'
                    label='CPF'
                    className='sm-3'>
                    <Form.Control
                      type="text"
                      placeholder="CPF"
                      value={formulario.cpf}
                      onChange={(e) => handleChange(e, "cpf")}
                    />
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
                      <Form.Control type="email" placeholder="Email" value={formulario.email} onChange={(e)=>handleChange(e,"email")}/>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicPassword">
                  <FloatingLabel
                      controlId='floatingInputPassword'
                      label='Senha'
                      className='sm-3'>
                      <Form.Control type="password" placeholder="Senha" value={formulario.senha} onChange={(e)=>handleChange(e,"senha")}/>
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
                  <Form.Control type="phone" placeholder="Telefone" value={formulario.telefone} onChange={(e)=>handleChange(e,"telefone")}/>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicBirth">
              <FloatingLabel
                  controlId='floatingInputBirth'
                  label='Data de Nascimento'
                  className='sm-3'>
                  <Form.Control type="date" placeholder="Data de Nascimento" value={formulario.data_nascimento} onChange={(e)=>handleChange(e,"data_nascimento")}/>
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
                  <Form.Control type="address" placeholder="Endereço" value={formulario.endereco_id} onChange={(e)=>handleChange(e,"endereco_id")}/>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicUsername">
              <FloatingLabel
                  controlId='floatingInputUsername'
                  label='Username'
                  className='sm-3'>
                  <Form.Control type="text" placeholder="Username" value={formulario.username} onChange={(e)=>handleChange(e,"username")}/>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

            <Row>
              <Col xs lg="2" style={{ marginTop: 10, marginBottom: 10 }}>
                <Button size="sm" variant="success" type="submit">
                  Atualizar
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Data de Nascimento</th>
          <th>Endereço</th>
          <th>Username</th>
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
                <td>{cliente.telefone}</td>
                <td>{cliente.data_nascimento}</td>
                <td>{cliente.endereco_id}</td>
                <td>{cliente.username}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEditar(cliente)}><MdModeEdit /></Button>
                  <Button variant="danger" onClick={() => mostrarModalConfirmacao(cliente)}><MdDeleteOutline /></Button>
                </td>
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
