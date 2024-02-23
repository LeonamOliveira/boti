import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const CategoriaLista = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Categorias</h2>
      <ul>
        {categories.map(category => (
          <li key={category.category_id}>{category.nome_categoria}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriaLista;