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

export default function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);
  const [showModalEdicao, setShowModalEdicao] = useState(false);
  
  const [formulario, setFormulario] = useState({
    nome_produto: '',
    descricao_produto: '',
    preco_produto: '',
    qtd_estoque: '',
    data_cadastro_produto: '',
    categoria_id: '',
    imagem: '',
  });

  useEffect(() => { 
    api.get('/produtos').then(response => {
      setProdutos(response.data)
    })
  }, [])

  const handleExcluir = async (produto_id) => {
    try {
      await api.delete(`/produtos/${produto_id}`)
      setProdutos(produtos.filter(produto => produto.produto_id !== produto_id))
      setProdutoParaExcluir(null);
    } catch (error) {
      console.log(error)
    }
  }

  const mostrarModalConfirmacao = (produto) => {
    setProdutoParaExcluir(produto);
  }
  
  const confirmarExclusao = () => {
    setProdutoParaExcluir(null);
  }

  const cancelarExclusao = () => {
    setProdutoParaExcluir(null);
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
      await api.post('/produtos', formulario);
      const response = await api.get('/produtos');
      setProdutos(response.data);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  const handleEditar = (produto) => {
    setProdutoParaEditar(produto);
    setFormulario({
      nome_produto: produto.nome_produto,
      descricao_produto: produto.descricao_produto,
      preco_produto: produto.preco_produto,
      qtd_estoque: produto.qtd_estoque,
      data_cadastro_produto: produto.data_cadastro_produto,
      categoria_id: produto.categoria_id,
      imagem: produto.imagem,
    });
    setShowModalEdicao(true);
  };

  const cancelarEdicao = () => {
    setProdutoParaEditar(null);
    setFormulario({
      nome_produto: '',
      descricao_produto: '',
      preco_produto: '',
      qtd_estoque: '',
      data_cadastro_produto: '',
      categoria_id: '',
      imagem: '',
    });
    setShowModalEdicao(false);
  };

  const handleSubmitEdicao = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/produtos/${produtoParaEditar.produto_id}`, formulario);
      const response = await api.get('/produtos');
      setProdutos(response.data);
      setShowModalEdicao(false);
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Cadastro de Produtos</h3>
        <Container>
          <Row>
            <Col>
              <FloatingLabel controlId="floatingInput" label="Nome do Produto">
                <Form.Control type="text" placeholder="Nome do Produto" onChange={(event) => handleChange(event, 'nome_produto')} />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInput" label="Descrição do Produto">
                <Form.Control type="text" placeholder="Descrição do Produto" onChange={(event) => handleChange(event, 'descricao_produto')} />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="floatingInput" label="Preço do Produto">
                <Form.Control type="number" placeholder="Preço do Produto" onChange={(event) => handleChange(event, 'preco_produto')} />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInput" label="Quantidade em Estoque">
                <Form.Control type="number" placeholder="Quantidade em Estoque" onChange={(event) => handleChange(event, 'qtd_estoque')} />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="floatingInput" label="Data de Cadastro">
                <Form.Control type="text" placeholder="Data de Cadastro" onChange={(event) => handleChange(event, 'data_cadastro_produto')} />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInput" label="Categoria">
                <Form.Control type="text" placeholder="Categoria" onChange={(event) => handleChange(event, 'categoria_id')} />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="floatingInput" label="Imagem">
                <Form.Control type="text" placeholder="Imagem" onChange={(event) => handleChange(event, 'imagem')} />
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
                    <td>
                      <Button variant="primary" onClick={() => handleEditar(produto)}><MdModeEdit /></Button>
                      <Button variant="danger" onClick={() => mostrarModalConfirmacao(produto)}><MdDeleteOutline /></Button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </Table>

      <Modal show={showModalEdicao} onHide={cancelarEdicao}>
        <Modal.Header closeButton>
          <Modal.Title>Edição de Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdicao}>
            <Container>
              <Row>
                <Col>
                  <FloatingLabel controlId="floatingInput" label="Nome do Produto">
                    <Form.Control type="text" placeholder="Nome do Produto" value={formulario.nome_produto} onChange={(event) => handleChange(event, 'nome_produto')} />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="floatingInput" label="Descrição do Produto">
                    <Form.Control type="text" placeholder="Descrição do Produto" value={formulario.descricao_produto} onChange={(event) => handleChange(event, 'descricao_produto')} />
                  </FloatingLabel>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FloatingLabel controlId="floatingInput" label="Preço do Produto">
                    <Form.Control type="number" placeholder="Preço do Produto" value={formulario.preco_produto} onChange={(event) => handleChange(event, 'preco_produto')} />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="floatingInput" label="Quantidade em Estoque">
                    <Form.Control type="number" placeholder="Quantidade em Estoque" value={formulario.qtd_estoque} onChange={(event) => handleChange(event, 'qtd_estoque')} />
                  </FloatingLabel>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FloatingLabel controlId="floatingInput" label="Data de Cadastro">
                    <Form.Control type="text" placeholder="Data de Cadastro" value={formulario.data_cadastro_produto} onChange={(event) => handleChange(event, 'data_cadastro_produto')} />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="floatingInput" label="Categoria">
                    <Form.Control type="text" placeholder="Categoria" value={formulario.categoria_id} onChange={(event) => handleChange(event, 'categoria_id')} />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel controlId="floatingInput" label="Imagem">
                    <Form.Control type="text" placeholder="Imagem" value={formulario.imagem} onChange={(event) => handleChange(event, 'imagem')} />
                  </FloatingLabel>
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

      <Modal show={!!produtoParaExcluir} onHide={cancelarExclusao}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o produto {produtoParaExcluir?.nome_produto}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarExclusao}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => { confirmarExclusao(); 
            handleExcluir(produtoParaExcluir?.produto_id);}}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
