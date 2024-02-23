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

export default function Enderecos() {
  const [enderecos, setEnderecos] = useState([])
  const [enderecoParaExcluir, setEnderecoParaExcluir] = useState(null);
  const [enderecoParaEditar, setEnderecoParaEditar] = useState(null); 
  const [showModalEdicao, setShowModalEdicao] = useState(false); 

  const [formulario, setFormulario] = useState({
    bairro: '',
    cep: '',
    rua: '',
    cidade: '',
    numero: '',
    complemento: '',
    uf: ''
  });

  useEffect(() => {
    api.get('/enderecos').then(response => {
      setEnderecos(response.data)
    })
  }, [])

  const handleExcluir = async (endereco_id) => {
    try {
      await api.delete(`/enderecos/${endereco_id}`)
      setEnderecos(enderecos.filter(endereco => endereco.endereco_id !== endereco_id))
      setEnderecoParaExcluir(null);
    } catch (error) {
      console.log(error)
    }
  }

  const mostrarModalConfirmacao = (endereco) => {
    setEnderecoParaExcluir(endereco);
  };

  const confirmarExclusao = () => {
    setEnderecoParaExcluir(null);
  };

  const cancelarExclusao = () => {
    setEnderecoParaExcluir(null);
  };

  const handleChange = (event, field) => {
    setFormulario((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/enderecos', formulario);
      const response = await api.get('/enderecos');
      setEnderecos(response.data);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  const handleEditar = (endereco) => {
    setEnderecoParaEditar(endereco);
    setFormulario({
      bairro: endereco.bairro,
      cep: endereco.cep,
      rua: endereco.rua,
      cidade: endereco.cidade,
      numero: endereco.numero,
      complemento: endereco.complemento,
      uf: endereco.uf,
    });
    setShowModalEdicao(true);
  };

  const cancelarEdicao = () => {
    setEnderecoParaEditar(null);
    setFormulario({
      bairro: '',
      cep: '',
      rua: '',
      cidade: '',
      numero: '',
      complemento: '',
      uf: '',
    });
    setShowModalEdicao(false);
  };

  const handleSubmitEdicao = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/enderecos/${enderecoParaEditar.endereco_id}`, formulario);
      const response = await api.get('/enderecos');
      setEnderecos(response.data);
      cancelarEdicao();
    } catch (error) {
      console.error('Erro ao enviar formulário de edição:', error);
    }
  };



  return (
    <> 
      <Form onSubmit={handleSubmit}>
        <h3>Cadastro de Endereços</h3>
        <Container>
          <Row>
            <Col>
              <Form.Group>
                <FloatingLabel
                  controlId="floatingInputCEP"
                  label="CEP"
                  className="sm-3"  
                >
                  <Form.Control type="text" placeholder="CEP" onChange={(e)=> handleChange(e, "cep")} />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <FloatingLabel
                  controlId="floatingInputBairro"
                  label="Bairro"
                  className='sm-3'
                >
                  <Form.Control type="text" placeholder="Bairro" onChange={(e)=> handleChange(e, "bairro")} />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId='formBasicCidade'>
                <FloatingLabel
                  controlId='floatingInputCidade'
                  label='Cidade'
                  className='sm-3'>
                  <Form.Control type="text" placeholder="Cidade" onChange={(e)=>handleChange(e,"cidade")}/>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='formBasicNumero'>
                <FloatingLabel
                  controlId='floatingInputNumero'
                  label='Número'
                  className='sm-3'>
                  <Form.Control type="number" placeholder="Número" onChange={(e)=>handleChange(e,"numero")}/>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col>
              <Form.Group controlId='formBasicRua'>
                <FloatingLabel
                  controlId='floatingInputRua'
                  label='Rua'
                  className='sm-3'>
                  <Form.Control type="text" placeholder="Rua" onChange={(e)=>handleChange(e,"rua")}/>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='formBasicUF'>
                <FloatingLabel
                  controlId='floatingInputUF'
                  label='UF'
                  className='sm-3'>
                  <Form.Control type="text" placeholder="UF" onChange={(e)=>handleChange(e,"uf")}/>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col>
            <Form.Group controlId='formBasicComplemento'>
              <FloatingLabel
                controlId='floatingInputComplemento'
                label='Complemento'
                className='sm-3'>
                <Form.Control type="text" placeholder="Complemento" onChange={(e)=>handleChange(e,"complemento")}/>
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
            <th>CEP</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Número</th>
            <th>Complemento</th>
            <th>UF</th>
            <th>Rua</th>
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
                  <td>{endereco.rua}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleEditar(endereco)}><MdModeEdit /></Button>
                    <Button variant="danger" onClick={() => mostrarModalConfirmacao(endereco)}><MdDeleteOutline /></Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>

      <Modal show={showModalEdicao} onHide={cancelarEdicao}>
        <Modal.Header closeButton>
            <Modal.Title>Editar Endereço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="form-container" onSubmit={handleSubmitEdicao}>
              <Container>
                <Row>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInputCEP"
                        label="CEP"
                        className="sm-3"  
                      >
                        <Form.Control type="text" placeholder="CEP" value={formulario.cep} onChange={(e)=> handleChange(e, "cep")} />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInputBairro"
                        label="Bairro"
                        className='sm-3'
                      >
                        <Form.Control type="text" placeholder="Bairro" value={formulario.bairro} onChange={(e)=> handleChange(e, "bairro")} />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId='formBasicCidade'>
                      <FloatingLabel
                        controlId='floatingInputCidade'
                        label='Cidade'
                        className='sm-3'>
                        <Form.Control type="text" placeholder="Cidade" value={formulario.cidade} onChange={(e)=>handleChange(e,"cidade")}/>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='formBasicNumero'>
                      <FloatingLabel
                        controlId='floatingInputNumero'
                        label='Número'
                        className='sm-3'>
                        <Form.Control type="number" placeholder="Número" value={formulario.numero} onChange={(e)=>handleChange(e,"numero")}/>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                <Col>
                    <Form.Group controlId='formBasicRua'>
                      <FloatingLabel
                        controlId='floatingInputRua'
                        label='Rua'
                        className='sm-3'>
                        <Form.Control type="text" placeholder="Rua" value={formulario.rua} onChange={(e)=>handleChange(e,"rua")}/>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='formBasicUF'>
                      <FloatingLabel
                        controlId='floatingInputUF'
                        label='UF'
                        className='sm-3'>
                        <Form.Control type="text" placeholder="UF" value={formulario.uf} onChange={(e)=>handleChange(e,"uf")}/>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId='formBasicComplemento'>
                      <FloatingLabel
                        controlId='floatingInputComplemento'
                        label='Complemento'
                        className='sm-3'>
                        <Form.Control type="text" placeholder="Complemento" value={formulario.complemento} onChange={(e)=>handleChange(e,"complemento")}/>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs lg="2" style={{marginTop:10, marginBottom:10}}>
                    <Button  size="sm" variant="success" type="submit">
                      Salvar
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Modal.Body>
      </Modal>

      <Modal show={!!enderecoParaExcluir} onHide={cancelarExclusao}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o endereço {enderecoParaExcluir?.rua}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarExclusao}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={ () => {confirmarExclusao();
            handleExcluir(enderecoParaExcluir?.endereco_id);}}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
