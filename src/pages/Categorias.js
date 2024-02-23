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

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaParaExcluir, setCategoriaParaExcluir] = useState(null);
  const [categoriaParaEditar, setCategoriaParaEditar] = useState(null); // Novo estado para edição
  const [formulario, setFormulario] = useState({
    nome_categoria: '',
    descricao_categoria: '',
  });
  const [showModalEdicao, setShowModalEdicao] = useState(false); // Novo estado para o modal de edição

  useEffect(() => {
    api.get('/categorias').then(response => {
      setCategorias(response.data)
    })
  }, [])

  const handleExcluir = async (categoria_id) => {
    try {
      await api.delete(`/categorias/${categoria_id}`)
      setCategorias(categorias.filter(categoria => categoria.categoria_id !== categoria_id))
      setCategoriaParaExcluir(null);
    } catch (error) {
      console.log(error)
    }
  }

  const mostrarModalConfirmacao = (categoria) => {
    setCategoriaParaExcluir(categoria);
  };

  const confirmarExclusao = () => {
    setCategoriaParaExcluir(null);
  };

  const cancelarExclusao = () => {
    setCategoriaParaExcluir(null);
  };

  const handleChange = (event, field)=>{
    formulario[`${field}`] = event.target.value
    console.log(formulario)
  }

  const handleEditar = (categoria) => {
    setCategoriaParaEditar(categoria);
    setFormulario({
      nome_categoria: categoria.nome_categoria,
      descricao_categoria: categoria.descricao_categoria,
    });
    setShowModalEdicao(true);
  };

  const handleSubmitEdicao = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/categorias/${categoriaParaEditar.categoria_id}`, formulario);
      const updatedCategorias = categorias.map((item) =>
        item.categoria_id === categoriaParaEditar.categoria_id ? formulario : item
      );
      setCategorias(updatedCategorias);
      setShowModalEdicao(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/produto_pedido', formulario);
      setCategorias([...categorias, formulario]);
    } catch (error) {
      console.log(error)
    }
  }


  const cancelarEdicao = () => {
    setShowModalEdicao(false);
    setCategoriaParaEditar(null);
    setFormulario({
      nome_categoria: '',
      descricao_categoria: '',
    });
  };

  return (
    <>
      <Form className="form-container" onSubmit={handleSubmit} >
        <h3>Cadastro de Categorias</h3>
        <Container style={{padding:20, borderRadius:5}}>
          <Row>
            <Col>
              <FloatingLabel controlId="floatingInputGrid" label="Nome da Categoria">
                <Form.Control type="text" placeholder="Nome da Categoria" onChange={(event) => handleChange(event, 'nome_categoria')} />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInputGrid" label="Descrição da Categoria">
                <Form.Control type="text" placeholder="Descrição da Categoria" onChange={(event) => handleChange(event, 'descricao_categoria')} />
              </FloatingLabel>
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
    
        <Table className="table-container" striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {
            categorias.map((categoria, index) => {
              return (
                <tr key={index}>
                  <td>
                      <Form.Control value={categoria.nome_categoria} onChange={(e)=>handleChange(e, "nome_categoria", index)}/>
                  </td>
                  <td>
                    <Form.Control value={categoria.descricao_categoria} onChange={(e)=>handleChange(e, "descricao_categoria",index)}/>
                  </td>
                  <td>
                  <Row style={{alignItems: "right"}}>
                    <Col>
                      <Button variant="primary" onClick={() => handleEditar(categoria)}> 
                        <MdModeEdit />
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="danger" onClick={() => mostrarModalConfirmacao(categoria)}>
                        <MdDeleteOutline />
                      </Button>
                    </Col>
                  </Row>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>

      <Modal show={showModalEdicao} onHide={cancelarEdicao}>
        <Modal.Header closeButton>
          <Modal.Title>Edição de Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-container" onSubmit={handleSubmitEdicao}>
            <Form.Group controlId='formBasicNomeCategoria'>
              <FloatingLabel
                controlId='floatingInputNomeCategoria'
                label='Nome da Categoria'>
                <Form.Control
                  type='text'
                  placeholder='Nome da Categoria'
                  onChange={(event) => setFormulario({ ...formulario, nome_categoria: event.target.value })}
                  value={formulario.nome_categoria}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId='formBasicDescricaoCategoria'>
              <FloatingLabel
                controlId='floatingInputDescricaoCategoria'
                label='Descrição da Categoria'>
                <Form.Control
                  type='text'
                  placeholder='Descrição da Categoria'
                  onChange={(event) => setFormulario({ ...formulario, descricao_categoria: event.target.value })}
                  value={formulario.descricao_categoria}
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

      <Modal show={!!categoriaParaExcluir} onHide={cancelarExclusao}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o categoria {categoriaParaExcluir?.nome}?
        </Modal.Body>
        <Modal.Footer>
          <Row style={{alignItems: "right"}}>
            <Col   >
                <Button variant="secondary" onClick={cancelarExclusao}>
                  Cancelar
                </Button>
              </Col>
              <Col>
                <Button variant="danger" onClick={() => { confirmarExclusao(); 
                  handleExcluir(categoriaParaExcluir?.categoria_id);}}>
                  Excluir
                </Button>
              </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  )
}

