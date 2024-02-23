import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {products.map(product => (
          <li key={product.produto_id}>
            <strong>{product.nome_produto}</strong> - {product.descricao_produto}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;