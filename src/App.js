import React from 'react';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categorias from './pages/Categorias';
import Clientes from './pages/Clientes';
import Enderecos from './pages/Enderecos';
import Pedidos from './pages/Pedidos';
import Produtos from './pages/Produtos';
import ProdutoPedido from './pages/ProdutoPedido';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <h1>Loja da Boti.</h1>
        <Nav variant='tabs' defaultActiveKey={Home}>
          <Nav.Link as={Link} to="/" >Página Inicial</Nav.Link>
          <Nav.Link as={Link} to="/categorias" >Categorias</Nav.Link>
          <Nav.Link as={Link} to="/clientes" >Clientes</Nav.Link>
          <Nav.Link as={Link} to="/enderecos" >Endereços</Nav.Link>
          <Nav.Link as={Link} to="/pedidos" >Pedidos</Nav.Link>
          <Nav.Link as={Link} to="/produtos" >Produtos</Nav.Link>
          <Nav.Link as={Link} to="/produto_pedido" >Produto Pedido</Nav.Link>
        </Nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/clientes" element={<Clientes />} /> 
          <Route path="/enderecos" element={<Enderecos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produto_pedido" element={<ProdutoPedido />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;